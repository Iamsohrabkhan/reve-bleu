const initializeWebflow = () => {
    if (window.Webflow && window.Webflow.require) {
        window.Webflow.destroy(); // 🛑 Destroy old Webflow interactions
        window.Webflow.require("ix2").init(); // ✅ Reinitialize Webflow interactions
        window.Webflow.ready(); // ✅ Ensure Webflow components are ready

        // 🔄 Force Webflow to re-execute scripts
        document.dispatchEvent(new Event("readystatechange"));

        console.log("✅ Webflow interactions reinitialized.");
    } else {
        console.warn("⚠️ Webflow is not available.");
    }
};

export default initializeWebflow;
