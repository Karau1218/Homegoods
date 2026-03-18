async function fetchCart() {
    const response = await fetch("/api/cart")

    if (response.status === 401) {
        return null
    }

    if (!response.ok) {
        throw new Error("Failed to fetch cart")
    }

    return await response.json()
}

function updateCartCount(items, shouldAnimate = false) {
    const cartCount = document.getElementById("cart-count")
    if (!cartCount) return

    const total = items.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = total

    if (shouldAnimate) {
        const cartIcon = document.querySelector(".icon-btn")

        if (cartIcon) {
            cartIcon.classList.remove("cart-bounce")
            void cartIcon.offsetWidth
            cartIcon.classList.add("cart-bounce")
        }
    }
}

async function loadCartCount() {
    try {
        const data = await fetchCart()
        if (!data) return
        updateCartCount(data.items || [], false)
    } catch (error) {
        console.error("Error loading cart count:", error)
    }
}

async function addToCart(productId) {
    try {
        const response = await fetch("/api/cart/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: Number(productId)
            })
        })

        if (response.status === 401) {
            window.location.href = "/login"
            return
        }

        if (!response.ok) {
            throw new Error("Failed to add item")
        }

        const data = await response.json()
        showCartNotice("Item added to cart")
        updateCartCount(data.items || [], true)
        renderCartPage(data.items || [])
    } catch (error) {
        console.error("Error adding to cart:", error)
    }
}

async function decreaseCartItem(productId) {
    try {
        const response = await fetch(`/api/cart/items/${productId}/decrease`, {
            method: "PATCH"
        })

        if (response.status === 401) {
            window.location.href = "/login"
            return
        }

        if (!response.ok) {
            throw new Error("Failed to decrease item")
        }

        const data = await response.json()
        updateCartCount(data.items || [], false)
        renderCartPage(data.items || [])
    } catch (error) {
        console.error("Error decreasing item:", error)
    }
}

async function removeFromCart(productId) {
    try {
        const response = await fetch(`/api/cart/items/${productId}`, {
            method: "DELETE"
        })

        if (response.status === 401) {
            window.location.href = "/login"
            return
        }

        if (!response.ok) {
            throw new Error("Failed to remove item")
        }

        const data = await response.json()
        updateCartCount(data.items || [], false)
        renderCartPage(data.items || [])
    } catch (error) {
        console.error("Error removing item:", error)
    }
}

async function clearCart() {
    try {
        const response = await fetch("/api/cart", {
            method: "DELETE"
        })

        if (response.status === 401) {
            window.location.href = "/login"
            return
        }

        if (!response.ok) {
            throw new Error("Failed to clear cart")
        }

        const data = await response.json()
        updateCartCount(data.items || [], false)
        renderCartPage(data.items || [])
    } catch (error) {
        console.error("Error clearing cart:", error)
    }
}

async function loadCartPage() {
    const cartItemsContainer = document.getElementById("cart-items")
    if (!cartItemsContainer) return

    try {
        const cartData = await fetchCart()

        if (!cartData) return

        updateCartCount(cartData.items || [], false)
        renderCartPage(cartData.items || [])
    } catch (error) {
        console.error("Error loading cart page:", error)

        const cartMessage = document.getElementById("cart-message")
        if (cartMessage) {
            cartMessage.textContent = "Could not load cart."
        }
    }
}

function showEmptyCart(
    cartItemsContainer,
    cartMessage,
    cartSummary,
    cartTotalItems,
    cartSubtotal
) {
    cartItemsContainer.innerHTML = ""

    if (cartMessage) {
        cartMessage.textContent = "Your cart is empty."
    }

    if (cartSummary) {
        cartSummary.style.display = "none"
    }

    if (cartTotalItems) {
        cartTotalItems.textContent = "0"
    }

    if (cartSubtotal) {
        cartSubtotal.textContent = "0.00"
    }
}

function createCartItemHtml(item) {
    return `
        <article class="product-card" style="margin-bottom: 1.5rem;">
            <div class="product-img">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ""}
            </div>

            <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <p class="price">$${Number(item.price).toFixed(2)}</p>

                <div class="cart-quantity">
                    <button
                        class="qty-btn decrease-cart-item"
                        data-product-id="${item.productId}"
                    >
                        −
                    </button>

                    <span class="qty-number">${item.quantity}</span>

                    <button
                        class="qty-btn add-to-cart"
                        data-product-id="${item.productId}"
                    >
                        +
                    </button>
                </div>

                <p>Item Total: $${Number(item.subtotal).toFixed(2)}</p>

                <div class="card-actions">
                    <button
                        class="button ghost small remove-cart-item"
                        data-product-id="${item.productId}"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </article>
    `
}

function updateCartSummary(cartItems, cartTotalItems, cartSubtotal, cartSummary) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0)

    if (cartTotalItems) {
        cartTotalItems.textContent = totalItems
    }

    if (cartSubtotal) {
        cartSubtotal.textContent = subtotal.toFixed(2)
    }

    if (cartSummary) {
        cartSummary.style.display = "block"
    }
}

function renderCartPage(cartItems) {
    const cartItemsContainer = document.getElementById("cart-items")
    const cartMessage = document.getElementById("cart-message")
    const cartSummary = document.getElementById("cart-summary")
    const cartTotalItems = document.getElementById("cart-total-items")
    const cartSubtotal = document.getElementById("cart-subtotal")

    if (!cartItemsContainer) return

    if (!cartItems.length) {
        showEmptyCart(
            cartItemsContainer,
            cartMessage,
            cartSummary,
            cartTotalItems,
            cartSubtotal
        )
        return
    }

    if (cartMessage) {
        cartMessage.textContent = ""
    }

    cartItemsContainer.innerHTML = cartItems.map(createCartItemHtml).join("")

    updateCartSummary(cartItems, cartTotalItems, cartSubtotal, cartSummary)
}

document.addEventListener("DOMContentLoaded", () => {
    loadCartCount()
    loadCartPage()

    const clearCartBtn = document.getElementById("clear-cart-btn")
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", clearCart)
    }
})

document.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-to-cart")

    if (addButton) {
        event.preventDefault()
        addToCart(addButton.dataset.productId)
        return
    }

    const decreaseButton = event.target.closest(".decrease-cart-item")

    if (decreaseButton) {
        event.preventDefault()
        decreaseCartItem(decreaseButton.dataset.productId)
        return
    }

    const removeButton = event.target.closest(".remove-cart-item")

    if (removeButton) {
        event.preventDefault()
        removeFromCart(removeButton.dataset.productId)
    }
})

function showCartNotice(message) {
    let notice = document.getElementById("cart-notice")

    if (!notice) {
        notice = document.createElement("div")
        notice.id = "cart-notice"
        notice.className = "cart-notice"
        document.body.appendChild(notice)
    }

    notice.textContent = message
    notice.classList.add("show")

    clearTimeout(showCartNotice.timeoutId)
    showCartNotice.timeoutId = setTimeout(() => {
        notice.classList.remove("show")
    }, 2000)
}