        function togglePasswordVisibility(passwordFieldId, eyeId, eyeSlashId) {
            var passwordField = document.getElementById(passwordFieldId);
            var eye = document.getElementById(eyeId);
            var eyeSlash = document.getElementById(eyeSlashId);
    
            if (passwordField.type === "password") {
                passwordField.type = "text";
                eye.style.opacity = "0";
                eyeSlash.style.opacity = "1";
            } else {
                passwordField.type = "password";
                eye.style.opacity = "1";
                eyeSlash.style.opacity = "0";
            }
        }
    
        function myLogPassword() {
            togglePasswordVisibility("logPassword", "eye", "eye-slash");
        }
    
        function myRegPassword() {
            togglePasswordVisibility("password", "eye-2", "eye-slash-2");
        }