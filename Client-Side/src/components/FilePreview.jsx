export default function FilePreviewLines({ lineBg, accentBg }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={`h-1.5 rounded ${accentBg} w-1/2`} />
      <div className={`h-1.5 rounded ${lineBg} w-4/5 mt-1`} />
      <div className={`h-1.5 rounded ${lineBg}`} />
      <div className={`h-1.5 rounded ${lineBg} w-2/3`} />
      <div className={`h-1.5 rounded ${lineBg}`} />
      <div className={`h-1.5 rounded ${lineBg} w-2/5`} />
      <div className={`h-1.5 rounded ${lineBg} w-3/5`} />
      <div className={`h-1.5 rounded ${lineBg} w-4/5`} />
      <div className={`h-1.5 rounded ${lineBg} w-3/5`} />
      <div className={`h-1.5 rounded ${lineBg} w-4/5`} />
      <div className={`h-1.5 rounded ${lineBg} w-3/5`} />
      <div className={`h-1.5 rounded ${lineBg} w-5/5`} />
    </div>
  );
}