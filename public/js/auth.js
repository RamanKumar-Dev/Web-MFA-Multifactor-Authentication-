async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('userId', data.userId); // CRITICAL FIX

        if (data.mfaRequired) {
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('mfa-section').classList.remove('hidden');
            // Auto-trigger OTP send if logging in with existing phone
            sendOtp(); 
        } else {
            window.location.href = "dashboard.html";
        }
    } else {
        alert(data.message);
    }
}

async function sendOtp() {
    const userId = localStorage.getItem('userId');
    const phoneNumber = document.getElementById('mobile-no')?.value || "Existing Device";

    const response = await fetch('/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, phoneNumber })
    });
    const data = await response.json();
    alert(data.message);
    document.getElementById('otp-verify-area')?.classList.remove('hidden');
}

async function verifyOtp() {
    // 1. Get the ID we saved during Login
    const userId = localStorage.getItem('userId');
    
    // 2. Get the 6-digit code (check both possible input IDs)
    const token = document.getElementById('sms-token')?.value || document.getElementById('mfa-token')?.value;

    if (!userId || userId === "null") {
        alert("Session expired. Please log in again.");
        window.location.href = 'index.html';
        return;
    }

    const response = await fetch('/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token })
    });

    const data = await response.json();
    if (response.ok) {
        alert("MFA Enabled/Verified Successfully!");
        window.location.href = "dashboard.html";
    } else {
        alert(data.message || "Invalid OTP");
    }
}