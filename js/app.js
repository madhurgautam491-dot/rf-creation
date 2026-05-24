// js/app.js
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Structural Global Loader Cleanup Animation
    const loader = document.getElementById("globalLoader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("fade-out");
        }, 300);
    });

    // 2. High-Performance Intersection Observer for Apple Scroll Animation Effect
    const revealElements = document.querySelectorAll(".reveal");
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Execution performance optimization lock
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Automated Pricing Tier Selection to Contact Bridge
    const selectTierButtons = document.querySelectorAll(".select-tier-btn");
    const targetServiceSelect = document.getElementById("targetService");

    selectTierButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const variantValue = btn.getAttribute("data-service");
            if (variantValue && targetServiceSelect) {
                targetServiceSelect.value = variantValue;
            }
        });
    });

    // 4. Secure Lead Capture Engine Execution Path
    const bookingForm = document.getElementById("orderBookingForm");
    const submitBtn = document.getElementById("formSubmitBtn");
    const alertBox = document.getElementById("formAlert");

    if (bookingForm) {
        bookingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // UI Mutation Layer State: Lock Interaction
            submitBtn.disabled = true;
            submitBtn.textContent = "Processing Onboarding Request...";
            alertBox.classList.add("hidden");

            // Extract values safely
            const name = document.getElementById("clientName").value.trim();
            const phone = document.getElementById("clientPhone").value.trim();
            const service = targetServiceSelect.value;
            const message = document.getElementById("clientMessage").value.trim();

            try {
                // Write payload tracking to Firestore database collections schema securely
                await addDoc(collection(db, "orders"), {
                    clientName: name,
                    clientPhone: phone,
                    selectedService: service,
                    clientMessage: message,
                    createdAt: serverTimestamp(),
                    status: "Pending Investigation"
                });

                // Clear visual context on functional success state
                alertBox.className = "form-alert success";
                alertBox.textContent = "Pipeline initialized successfully. Our production squad will call you shortly.";
                alertBox.classList.remove("hidden");
                bookingForm.reset();

            } catch (error) {
                console.error("Database Write Error Exception Trace: ", error);
                alertBox.className = "form-alert error";
                alertBox.textContent = "An error intercepted deployment. Please retry or connect directly via WhatsApp.";
                alertBox.classList.remove("hidden");
            } finally {
                // Return interface interaction state lock
                submitBtn.disabled = false;
                submitBtn.textContent = "Deploy Growth Pipeline";
            }
        });
    }
});
