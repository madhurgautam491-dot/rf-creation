// js/admin.js
import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const authGate = document.getElementById("authGateContainer");
const workspace = document.getElementById("dashboardWorkspace");
const loginForm = document.getElementById("adminLoginForm");
const authAlert = document.getElementById("authAlert");
const logoutBtn = document.getElementById("logoutBtn");
const tableBody = document.getElementById("ordersTableBody");

// 1. Session Observer Protection Enforcement Hook Routing
onAuthStateChanged(auth, (user) => {
    if (user) {
        authGate.classList.add("hidden");
        workspace.classList.remove("hidden");
        initializeRealtimeOrderStream();
    } else {
        workspace.classList.add("hidden");
        authGate.classList.remove("hidden");
        tableBody.innerHTML = ""; // Hard drop current UI cache on session end
    }
});

// 2. Authentication Flow Exception Management
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        authAlert.classList.add("hidden");
        
        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            loginForm.reset();
        } catch (error) {
            console.error("Auth Exception State Trap: ", error);
            authAlert.textContent = "Verification Failed: Invalid credentials sequence.";
            authAlert.classList.remove("hidden");
        }
    });
}

// 3. Graceful De-auth Logout Pipeline Route
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => signOut(auth));
}

// 4. Managed Realtime Stream Synchronization
let unsubscribeStream = null;
function initializeRealtimeOrderStream() {
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    
    // Setup hot sync binding listener matrix mapping pipeline
    unsubscribeStream = onSnapshot(ordersQuery, (snapshot) => {
        if (snapshot.empty) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 3rem;">No pipeline records located inside active memory vectors.</td></tr>`;
            return;
        }

        let dynamicHTMLRowsBuffer = "";
        snapshot.forEach((documentObject) => {
            const data = documentObject.data();
            const recordId = documentObject.id;
            const calendarFormattedDate = data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-IN", {
                month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
            }) : "Syncing Phase...";

            dynamicHTMLRowsBuffer += `
                <tr>
                    <td>
                        <strong style="display:block; font-size:1.05rem; color:#fff;">${escapeHTML(data.clientName)}</strong>
                        <span style="color:#ff3366; font-size:0.9rem; display:block; margin:0.2rem 0;">${escapeHTML(data.clientPhone)}</span>
                        <small style="color:var(--text-muted);">${calendarFormattedDate}</small>
                    </td>
                    <td><span style="background:rgba(112,0,255,0.15); color:#9d55ff; padding:0.3rem 0.6rem; border-radius:6px; font-size:0.85rem; font-weight:600; border:1px solid rgba(112,0,255,0.2);">${escapeHTML(data.selectedService)}</span></td>
                    <td style="color:#d2d2d7; max-width:400px; line-height:1.5; font-size:0.9rem;">${escapeHTML(data.clientMessage || 'N/A')}</td>
                    <td>
                        <button class="btn-delete" data-id="${recordId}"><i class="fa-solid fa-trash-can"></i> Scrub</button>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = dynamicHTMLRowsBuffer;

        // Dynamic internal live listener allocation hook mapping
        const deleteButtons = tableBody.querySelectorAll(".btn-delete");
        deleteButtons.forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const docIdToDelete = btn.getAttribute("data-id");
                if (confirm("Confirm permanent removal of lead log registration record?")) {
                    try {
                        await deleteDoc(doc.getFirestoreDocRefInstance(db, "orders", docIdToDelete));
                    } catch (err) {
                        // Handle standard modern collection reference mappings
                        await deleteDoc(doc(db, "orders", docIdToDelete));
                    }
                }
            });
        });
    }, (error) => {
        console.error("Data Synchronizer Context Interruption Error: ", error);
    });
}

// Security Helper to avoid script vulnerabilities
function escapeHTML(str) {
    if(!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
