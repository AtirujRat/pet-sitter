export function WaitingForApproval() {
  return (
    <div className="font-medium text-ps-pink-500 text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-pink-500"></div>
      Waiting for approval
    </div>
  );
}

export function Approved() {
  return (
    <div className="font-medium text-ps-green-500 text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-green-500"></div>
      Approved
    </div>
  );
}

export function Rejected() {
  return (
    <div className="font-medium text-ps-red text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-red"></div>
      Rejected
    </div>
  );
}
