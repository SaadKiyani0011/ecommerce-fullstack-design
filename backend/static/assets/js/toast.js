// toast.css is required for styling
// Create container if it doesn't exist
document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }
});

/**
 * Show a toast notification
 * @param {string} msg - The message to show
 * @param {string} type - 'success', 'error', 'info'
 */
window.showToast = function(msg, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    // Select emoji based on type
    let icon = "✅";
    if (type === "error") icon = "❌";
    else if (type === "info") icon = "ℹ️";

    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span class="toast-msg">${msg}</span>`;

    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add("toast-hiding");
        toast.addEventListener("animationend", () => {
            if(toast.parentNode) toast.remove();
        });
    }, 3000);
}
