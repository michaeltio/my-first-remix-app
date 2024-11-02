import TrashBinIcon from "@gravity-ui/icons/svgs/trash-bin.svg";
interface TaskProps {
  item: string;
  isComplete: boolean;
  handleCheckbox: () => void;
  handleDelete: () => void;
}

function Task({ item, isComplete, handleCheckbox, handleDelete }: TaskProps) {
  return (
    <div className="flex justify-between bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 px-5 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <p>{item}</p>
      <div className="flex gap-8">
        <button className="border-1 border-black" onClick={handleDelete}>
          <img src={TrashBinIcon} alt="" />
        </button>
        <input type="checkbox" onChange={handleCheckbox} checked={isComplete} />
      </div>
    </div>
  );
}

export default Task;
