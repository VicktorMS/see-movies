export default function BottomDrawer({ isOpen, onClose, children }){
    return (
      <>
        {/* Dark overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } z-40`}
          onClick={onClose}
        ></div>
  
        {/* Drawer */}
        <div
          className={`fixed inset-x-0 bottom-0 h-2/3 transition-transform transform ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } bg-base-100 border-t-4 border-secondary shadow-lg z-[100]`}
        >
          <div className="p-4">
            <button onClick={onClose} className="btn btn-secondary w-fit text-right w-full">
              Fechar
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </>
    );
  };