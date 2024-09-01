import BottomDrawer from "@/app/ui/bottom-drawer";

function CreateFavoriteListDrawer({ isOpen, onClose }) {
  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose} >
      <form action=""></form>
      <label className="input input-bordered flex items-center gap-2">
        Titulo da Lista de Favoritos
        <input type="text" className="grow" placeholder="Daisy" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Descrição
        <input type="text" className="grow" placeholder="daisy@site.com" />
      </label>
    </BottomDrawer>
  )
}

export default CreateFavoriteListDrawer