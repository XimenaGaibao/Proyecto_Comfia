// src/Alerts.js
import Swal from 'sweetalert2';

// Éxito
export const showSuccess = (message, title = "¡Éxito!") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonColor: "#8C7354",
    confirmButtonText: "Aceptar",
    timer: 3000,
    timerProgressBar: true
  });
};

// Error
export const showError = (message, title = "Error") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "error",
    confirmButtonColor: "#8C7354",
    confirmButtonText: "Aceptar"
  });
};

// Advertencia
export const showWarning = (message, title = "Advertencia") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    confirmButtonColor: "#8C7354",
    confirmButtonText: "Aceptar"
  });
};

// Confirmación
export const showConfirm = (message, title = "Confirmar Eliminación", confirmText = "Eliminar", cancelText = "Cancelar") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#EF4444",
    cancelButtonColor: "#6B7280",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  });
};

// Información
export const showInfo = (message, title = "Información") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "info",
    confirmButtonColor: "#8C7354",
    confirmButtonText: "Aceptar"
  });
};

// Modal de Desactivar Cuenta
export const showDeactivateAccountModal = async () => {
  let inputValue = '';
  let confirmButton = null;

  const result = await Swal.fire({
    title: '',
    html: `
      <div id="deactivate-modal" style="text-align: center; font-family: 'Inter', 'Poppins', sans-serif;">
        <div style="display: flex; justify-content: center; margin-bottom: 16px;">
          <div style="width: 56px; height: 56px; background: #8C7354; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <span style="color: white; font-weight: bold; font-size: 28px;">C</span>
          </div>
        </div>
        
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #1F2937; margin-bottom: 16px;">Desactivar Cuenta</h2>
        
        <p style="font-size: 0.85rem; color: #6B7280; line-height: 1.5; margin-bottom: 24px; text-align: left;">
          Esta acción suspenderá su acceso a la <strong>Gestión de créditos de COMFÍA</strong>. Todos los procesos en curso, informes de crédito y usuarios, los directorios asociados se archivarán y no se podrá acceder a ellos.
        </p>
        
        <div style="display: flex; gap: 16px; margin-bottom: 24px;">
          <div style="flex: 1; background: #F9FAFB; border-radius: 12px; padding: 16px; text-align: center; border: 1px solid #F0F0F0;">
            <div style="width: 40px; height: 40px; background: #F4ECA6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
              <span class="material-symbols-outlined" style="font-size: 22px; color: #8C7354;">archive</span>
            </div>
            <h3 style="font-size: 0.85rem; font-weight: 700; color: #1F2937; margin-bottom: 8px;">CONSERVAR DATOS</h3>
            <p style="font-size: 0.7rem; color: #6B7280; line-height: 1.4;">Se archivarán por 30 días antes de su eliminación definitiva.</p>
          </div>
          
          <div style="flex: 1; background: #F9FAFB; border-radius: 12px; padding: 16px; text-align: center; border: 1px solid #F0F0F0;">
            <div style="width: 40px; height: 40px; background: #F4ECA6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
              <span class="material-symbols-outlined" style="font-size: 22px; color: #8C7354;">credit_card</span>
            </div>
            <h3 style="font-size: 0.85rem; font-weight: 700; color: #1F2937; margin-bottom: 8px;">LÍNEAS DE CRÉDITO</h3>
            <p style="font-size: 0.7rem; color: #6B7280; line-height: 1.4;">&nbsp;</p>
          </div>
        </div>
        
        <p style="font-size: 0.8rem; font-weight: 600; color: #EF4444; margin-bottom: 12px; text-align: left;">
          PARA CONFIRMAR, ESCRIBE <span style="color: #EF4444;">DESACTIVAR</span>
        </p>
        
        <input type="text" id="confirm-deactivate-input" placeholder="DESACTIVAR" autocomplete="off" style="width: 100%; padding: 12px 16px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px; font-size: 0.9rem; outline: none; font-family: 'Inter', 'Poppins', sans-serif;">
        
        <div style="margin-top: 8px;">
          <p id="deactivate-error" style="color: #EF4444; font-size: 0.7rem; text-align: left; display: none;">Debes escribir DESACTIVAR para confirmar</p>
        </div>
      </div>
    `,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#8C7354',
    cancelButtonColor: '#FFFFFF',
    focusConfirm: false,
    background: 'white',
    customClass: {
      popup: 'deactivate-popup-custom',
      confirmButton: 'deactivate-confirm-btn',
      cancelButton: 'deactivate-cancel-btn',
    },
    didOpen: () => {  
      const style = document.createElement('style');
      style.textContent = `
        .deactivate-popup-custom {
          border-radius: 24px !important;
          padding: 0 !important;
          width: 500px !important;
          max-width: 90vw !important;
          border-top: 3px solid #EF4444 !important;
          font-family: 'Inter', 'Poppins', sans-serif !important;
        }
        .deactivate-popup-custom .swal2-html-container {
          padding: 24px !important;
          margin: 0 !important;
        }
        .deactivate-popup-custom .swal2-actions {
          padding: 0 24px 24px 24px !important;
          margin: 0 !important;
          gap: 16px !important;
        }
        .deactivate-confirm-btn {
          background-color: #8C7354 !important;
          color: white !important;
          border: none !important;
          padding: 10px 24px !important;
          border-radius: 30px !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .deactivate-confirm-btn:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
        .deactivate-confirm-btn:not(:disabled):hover {
          background-color: #6B5740 !important;
        }
        .deactivate-cancel-btn {
          background-color: white !important;
          color: #6B7280 !important;
          border: 1px solid #E5E7EB !important;
          padding: 10px 24px !important;
          border-radius: 30px !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
        }
        .deactivate-cancel-btn:hover {
          background-color: #F9FAFB !important;
          border-color: #D1D5DB !important;
        }
        .deactivate-popup-custom .swal2-title {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      const input = document.getElementById('confirm-deactivate-input');
      const errorMsg = document.getElementById('deactivate-error');
      
      setTimeout(() => {
        const confirmBtn = document.querySelector('.deactivate-confirm-btn');
        confirmButton = confirmBtn;
        if (confirmButton) confirmButton.disabled = true;
        
        if (input) {
          input.addEventListener('input', (e) => {
            inputValue = e.target.value;
            if (inputValue === 'DESACTIVAR') {
              if (confirmButton) confirmButton.disabled = false;
              if (errorMsg) errorMsg.style.display = 'none';
            } else {
              if (confirmButton) confirmButton.disabled = true;
              if (errorMsg) errorMsg.style.display = 'block';
            }
          });
          input.addEventListener('focus', () => input.style.borderColor = '#8C7354');
          input.addEventListener('blur', () => input.style.borderColor = '#E5E7EB');
        }
      }, 100);
    },
    preConfirm: () => {
      const input = document.getElementById('confirm-deactivate-input');
      const value = input ? input.value : '';
      if (value !== 'DESACTIVAR') {
        Swal.showValidationMessage('Debes escribir DESACTIVAR para confirmar');
        return false;
      }
      return { confirmed: true };
    }
  });

  return result;
};