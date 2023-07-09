import ButtonDropDownShare from "src/components/ButtonDropDownShare";
import NftMoreDropdown from "src/components/NftMoreDropdown";

const LikeSaveBtns = ({ price, onChangePrice }) => {
  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <ButtonDropDownShare panelMenusClass="!w-52" />
        <NftMoreDropdown price={price} onChangePrice={onChangePrice} />
      </div>
    </div>
  );
};

export default LikeSaveBtns;
