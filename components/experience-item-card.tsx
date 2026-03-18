interface ExperienceItemCardProps {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  presentLabel?: string;
  isLast?: boolean;
}

const ExperienceItemCard = (props: ExperienceItemCardProps) => {
  return (
    <div className={`relative pl-8 sm:pl-10 ${props.isLast ? "" : "pb-10"}`}>
      {/* Timeline dot */}
      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-white" />

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
            {props.role}
          </h3>
          <span className="text-sm text-slate-500 whitespace-nowrap">
            {props.startDate} — {props.endDate ?? (props.presentLabel || "Present")}
          </span>
        </div>
        <p className="text-sm sm:text-base font-medium text-slate-700">
          {props.company}
          {props.location && (
            <span className="text-slate-500"> · {props.location}</span>
          )}
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default ExperienceItemCard;
