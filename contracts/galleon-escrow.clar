;; GALLEON Escrow Contract
;; Milestone-based USDCx escrow for cross-chain funding
;;
;; This contract manages escrow agreements between investors (who fund via Ethereum)
;; and builders (who receive USDCx on Stacks).

;; ============================================
;; CONSTANTS
;; ============================================

(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ESCROW-NOT-FOUND (err u101))
(define-constant ERR-INVALID-STATUS (err u102))
(define-constant ERR-MILESTONE-NOT-FOUND (err u103))
(define-constant ERR-MILESTONE-NOT-RELEASED (err u104))
(define-constant ERR-ALREADY-CLAIMED (err u105))
(define-constant ERR-INSUFFICIENT-BALANCE (err u106))

;; USDCx token contract reference (testnet)
(define-constant USDCX-CONTRACT 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.usdcx)

;; ============================================
;; DATA VARS
;; ============================================

(define-data-var next-escrow-id uint u1)

;; ============================================
;; DATA MAPS
;; ============================================

;; Escrow storage
(define-map escrows
  { escrow-id: uint }
  {
    investor: principal,
    builder: principal,
    total-amount: uint,
    locked-amount: uint,
    released-amount: uint,
    claimed-amount: uint,
    status: (string-ascii 20),
    created-at: uint
  }
)

;; Milestone storage
(define-map milestones
  { escrow-id: uint, milestone-index: uint }
  {
    amount: uint,
    status: (string-ascii 10)  ;; "locked", "released", "claimed"
  }
)

;; Escrow milestone count
(define-map escrow-milestone-count
  { escrow-id: uint }
  { count: uint }
)

;; ============================================
;; READ-ONLY FUNCTIONS
;; ============================================

(define-read-only (get-escrow (escrow-id uint))
  (map-get? escrows { escrow-id: escrow-id })
)

(define-read-only (get-milestone (escrow-id uint) (milestone-index uint))
  (map-get? milestones { escrow-id: escrow-id, milestone-index: milestone-index })
)

(define-read-only (get-milestone-count (escrow-id uint))
  (default-to { count: u0 } (map-get? escrow-milestone-count { escrow-id: escrow-id }))
)

(define-read-only (get-next-escrow-id)
  (var-get next-escrow-id)
)

;; ============================================
;; PUBLIC FUNCTIONS
;; ============================================

;; Create a new escrow
;; Called by investor after USDCx is in their wallet
(define-public (create-escrow 
  (builder principal)
  (total-amount uint)
  (milestone-amounts (list 10 uint)))
  (let
    (
      (escrow-id (var-get next-escrow-id))
      (investor tx-sender)
    )
    ;; Transfer USDCx from investor to contract
    (try! (contract-call? USDCX-CONTRACT transfer 
      total-amount 
      investor 
      (as-contract tx-sender) 
      none))
    
    ;; Store escrow
    (map-set escrows
      { escrow-id: escrow-id }
      {
        investor: investor,
        builder: builder,
        total-amount: total-amount,
        locked-amount: total-amount,
        released-amount: u0,
        claimed-amount: u0,
        status: "active",
        created-at: block-height
      }
    )
    
    ;; Store milestones
    (map-set escrow-milestone-count
      { escrow-id: escrow-id }
      { count: (len milestone-amounts) }
    )
    
    ;; Initialize each milestone
    (fold store-milestone milestone-amounts { escrow-id: escrow-id, index: u0 })
    
    ;; Increment escrow ID
    (var-set next-escrow-id (+ escrow-id u1))
    
    (ok escrow-id)
  )
)

;; Helper to store milestones during creation
(define-private (store-milestone 
  (amount uint) 
  (state { escrow-id: uint, index: uint }))
  (begin
    (map-set milestones
      { escrow-id: (get escrow-id state), milestone-index: (get index state) }
      { amount: amount, status: "locked" }
    )
    { escrow-id: (get escrow-id state), index: (+ (get index state) u1) }
  )
)

;; Release a milestone (investor action)
;; Marks milestone as "released" - builder can now claim
(define-public (release-milestone (escrow-id uint) (milestone-index uint))
  (let
    (
      (escrow (unwrap! (get-escrow escrow-id) ERR-ESCROW-NOT-FOUND))
      (milestone (unwrap! (get-milestone escrow-id milestone-index) ERR-MILESTONE-NOT-FOUND))
    )
    ;; Only investor can release
    (asserts! (is-eq tx-sender (get investor escrow)) ERR-NOT-AUTHORIZED)
    ;; Must be active
    (asserts! (is-eq (get status escrow) "active") ERR-INVALID-STATUS)
    ;; Must be locked
    (asserts! (is-eq (get status milestone) "locked") ERR-INVALID-STATUS)
    
    ;; Update milestone status
    (map-set milestones
      { escrow-id: escrow-id, milestone-index: milestone-index }
      (merge milestone { status: "released" })
    )
    
    ;; Update escrow balances
    (map-set escrows
      { escrow-id: escrow-id }
      (merge escrow {
        locked-amount: (- (get locked-amount escrow) (get amount milestone)),
        released-amount: (+ (get released-amount escrow) (get amount milestone))
      })
    )
    
    (ok true)
  )
)

;; Claim a released milestone (builder action)
;; Transfers USDCx to builder
(define-public (claim-milestone (escrow-id uint) (milestone-index uint))
  (let
    (
      (escrow (unwrap! (get-escrow escrow-id) ERR-ESCROW-NOT-FOUND))
      (milestone (unwrap! (get-milestone escrow-id milestone-index) ERR-MILESTONE-NOT-FOUND))
    )
    ;; Only builder can claim
    (asserts! (is-eq tx-sender (get builder escrow)) ERR-NOT-AUTHORIZED)
    ;; Must be released
    (asserts! (is-eq (get status milestone) "released") ERR-MILESTONE-NOT-RELEASED)
    
    ;; Transfer USDCx to builder
    (try! (as-contract (contract-call? USDCX-CONTRACT transfer
      (get amount milestone)
      tx-sender
      (get builder escrow)
      none)))
    
    ;; Update milestone status
    (map-set milestones
      { escrow-id: escrow-id, milestone-index: milestone-index }
      (merge milestone { status: "claimed" })
    )
    
    ;; Update escrow balances
    (map-set escrows
      { escrow-id: escrow-id }
      (merge escrow {
        released-amount: (- (get released-amount escrow) (get amount milestone)),
        claimed-amount: (+ (get claimed-amount escrow) (get amount milestone))
      })
    )
    
    ;; Check if all claimed = update status to completed
    (if (is-eq (+ (get claimed-amount escrow) (get amount milestone)) (get total-amount escrow))
      (map-set escrows
        { escrow-id: escrow-id }
        (merge escrow { 
          status: "completed",
          released-amount: u0,
          claimed-amount: (get total-amount escrow)
        })
      )
      true
    )
    
    (ok true)
  )
)

;; Clawback remaining funds (investor action)
;; Only works if escrow is still active
(define-public (clawback (escrow-id uint))
  (let
    (
      (escrow (unwrap! (get-escrow escrow-id) ERR-ESCROW-NOT-FOUND))
      (refund-amount (get locked-amount escrow))
    )
    ;; Only investor can clawback
    (asserts! (is-eq tx-sender (get investor escrow)) ERR-NOT-AUTHORIZED)
    ;; Must be active
    (asserts! (is-eq (get status escrow) "active") ERR-INVALID-STATUS)
    ;; Must have locked funds
    (asserts! (> refund-amount u0) ERR-INSUFFICIENT-BALANCE)
    
    ;; Transfer remaining USDCx back to investor
    (try! (as-contract (contract-call? USDCX-CONTRACT transfer
      refund-amount
      tx-sender
      (get investor escrow)
      none)))
    
    ;; Update escrow status
    (map-set escrows
      { escrow-id: escrow-id }
      (merge escrow {
        locked-amount: u0,
        status: "clawback"
      })
    )
    
    (ok refund-amount)
  )
)
