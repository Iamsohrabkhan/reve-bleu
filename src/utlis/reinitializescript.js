const reloadWebflowScripts = () => {
    const webflowScript = document.querySelector('script[src*="webflow.js"]');
    
    if (webflowScript) {
        console.log("♻️ Reloading Webflow scripts...");
        
        // Remove existing script
        webflowScript.remove();

        // Create a new script element
        const newScript = document.createElement("script");
        newScript.src = webflowScript.src;
        newScript.async = true;

        // Append new script to the body
        document.body.appendChild(newScript);

        console.log("✅ Webflow scripts reloaded.");
    } else {
        console.warn("⚠️ Webflow script not found.");
    }
};

export default reloadWebflowScripts;