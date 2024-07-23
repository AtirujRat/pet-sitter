export function WaitingForConfirm() {
  return (
    <div className="font-medium text-ps-pink-500 text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-pink-500"></div>
      Waiting for confirm
    </div>
  );
}

export function WaitingForService() {
  return (
    <div className="font-medium text-ps-yellow-200 text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-yellow-200"></div>
      Waiting for service
    </div>
  );
}

export function InService() {
  return (
    <div className="font-medium text-ps-blue-500 text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-blue-500"></div>
      In service
    </div>
  );
}

export function Success() {
  return (
    <div className="font-medium text-ps-green-500 text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-green-500"></div>
      Success
    </div>
  );
}

export function Canceled() {
  return (
    <div className="font-medium text-ps-red text-[16px] flex items-center gap-2">
      <div className="w-[6px] h-[6px] rounded-full bg-ps-red"></div>
      Canceled
    </div>
  );
}
