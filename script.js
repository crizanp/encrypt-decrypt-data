document.addEventListener("DOMContentLoaded", () => {
  const encryptSeed = (seedPhrase, password) => {
    return CryptoJS.AES.encrypt(seedPhrase, password).toString();
  };

  const decryptSeed = (cipherText, password) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, password);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return null;
    }
  };

  const encryptSeedField = document.getElementById("encrypt-seed");
  const encryptPasswordField = document.getElementById("encrypt-password");
  const encryptedOutput = document.getElementById("encrypted-output");
  const encryptedSeedField = document.getElementById("encrypted-seed");
  const decryptSeedField = document.getElementById("decrypt-seed");
  const decryptPasswordField = document.getElementById("decrypt-password");
  const decryptedOutput = document.getElementById("decrypted-output");
  const decryptedSeedField = document.getElementById("decrypted-seed");
  const errorMessage = document.getElementById("error-message");
  const modal = document.getElementById("modal");
  const refreshButton = document.getElementById("refresh-button");
  const confirmRefresh = document.getElementById("confirm-refresh");
  const cancelRefresh = document.getElementById("cancel-refresh");

  const toggleEncryptPassword = document.getElementById(
    "toggle-encrypt-password"
  );
  const toggleDecryptPassword = document.getElementById(
    "toggle-decrypt-password"
  );

  // Password visibility
  [toggleEncryptPassword, toggleDecryptPassword].forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const field = e.target.previousElementSibling;
      field.type = field.type === "password" ? "text" : "password";
      e.target.textContent = field.type === "password" ? "👁️" : "🙈";
      e.target.style.animation = "pulse 0.5s ease-in-out";
      setTimeout(() => (e.target.style.animation = ""), 500);
    });
  });

  // Encryption
  document.getElementById("encrypt-button").addEventListener("click", () => {
    const seedPhrase = encryptSeedField.value;
    const password = encryptPasswordField.value;

    if (seedPhrase && password) {
      const encrypted = encryptSeed(seedPhrase, password);
      encryptedSeedField.value = encrypted;
      encryptedOutput.classList.remove("hidden");
      errorMessage.classList.add("hidden");
      encryptedOutput.style.animation = "fade-in 0.5s ease-out";
    } else {
      errorMessage.textContent =
        "Data corruption detected. Enter your secret code and a passphrase!";
      errorMessage.classList.remove("hidden");
      errorMessage.style.animation = "shake 0.5s ease-in-out";
    }
  });

  // Decryption
  document.getElementById("decrypt-button").addEventListener("click", () => {
    const encryptedSeed = decryptSeedField.value;
    const password = decryptPasswordField.value;

    if (encryptedSeed && password) {
      const decrypted = decryptSeed(encryptedSeed, password);
      if (decrypted) {
        decryptedSeedField.value = decrypted;
        decryptedOutput.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        decryptedOutput.style.animation = "fade-in 0.5s ease-out";
      } else {
        errorMessage.textContent =
          "Decryption failed. Incorrect passphrase or corrupted data!";
        errorMessage.classList.remove("hidden");
        errorMessage.style.animation = "shake 0.5s ease-in-out";
      }
    } else {
      errorMessage.textContent =
        "Requires both encrypted data and passphrase. Engage!";
      errorMessage.classList.remove("hidden");
      errorMessage.style.animation = "shake 0.5s ease-in-out";
    }
  });

  // Refresh functionality
  refreshButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.style.animation = "modal-fade-in 0.3s ease-out";
  });

  confirmRefresh.addEventListener("click", () => {
    encryptSeedField.value = "";
    encryptPasswordField.value = "";
    encryptedSeedField.value = "";
    decryptSeedField.value = "";
    decryptPasswordField.value = "";
    decryptedSeedField.value = "";
    encryptedOutput.classList.add("hidden");
    decryptedOutput.classList.add("hidden");
    errorMessage.classList.add("hidden");
    modal.classList.add("hidden");
    modal.style.animation = "modal-fade-out 0.3s ease-out";
  });

  cancelRefresh.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.style.animation = "modal-fade-out 0.3s ease-out";
  });

  // Close modal when clicking outside (overlay)
  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.style.animation = "modal-fade-out 0.3s ease-out";
  });
});
