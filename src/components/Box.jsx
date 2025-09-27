/**
 *
 * @param {object} props
 * @param {number | string} props.order
 */
export const Box = (props) => {
  return (
    <>
      {/* ... sisa kode Anda ... */}
      <div className="mb-2 w-[100px] h-[100px] overflow-hidden">
        <div>
          <p>ini box {props.order}</p>
        </div>
      </div>
    </>
  );
};
