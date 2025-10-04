import React from "react";
import clsx from "clsx";

type BMCData = {
  keyPartnerships: string[];
  keyActivities: string[];
  valueProposition: string[];
  managementFinancing: string[];
  customerRelationships: string[];
  customerSegments?: string[];
  keyResources: string[];
  channels: string[];
  costStructure: string[];
  revenueStreams: string[];
};

type Props = {
  data?: Partial<BMCData>;
  className?: string;
};

const defaultData: BMCData = {
  keyPartnerships: [
    "Nigerian Exchange (NGX)",
    "Securities and Exchange Commission (SEC)",
    "Banks",
    "Institutional Investors (International and Local Development Banks)",
    "Foundations",
    "Government Ministries & Agencies",
  ],
  keyActivities: [
    "Investment/SMMEs appraisal",
    "Fund raising",
    "Registering & appraising entrepreneurial ideas",
    "Monitoring and evaluation of engaged projects",
  ],
  valueProposition: [
    "Nano business empowerment",
    "Venture capital support",
    "Private equity support",
    "Ethical and development financing",
  ],
  managementFinancing: [
    "Seed capital",
    "Series A funding",
    "Series B funding",
    "Business development",
    "Business diagnosis",
  ],
  customerRelationships: [
    "Personal assistance",
    "Self-service (robo financial advisor)",
    "Co-creation (collaborative product/service innovation)",
    "Training workshops",
  ],

  keyResources: [
    "Human resources",
    "IT resources",
    "Motor vehicles",
    "Conducive office space",
  ],
  channels: [
    "Social media",
    "Website",
    "Door-to-door service delivery",
    "Customized service delivery",
  ],
  costStructure: [
    "Employees capacity building",
    "SEC licensing",
    "IT costs",
    "Legal & administration",
  ],
  revenueStreams: [
    "Management fee and business development services",
    "Commission from fund raising",
    "Commission on return on investment",
  ],
};

function SectionCard({
  title,
  items,
  className,
  title2,
  items2,
}: {
  title: string;
  items: string[];
  className?: string;
  title2?: string;
  items2?: string[];
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-border bg-card shadow-md transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5",
        "p-5 md:p-6",
        className
      )}
    >
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground mb-3 uppercase">
        {title}
      </h3>
      <ul className="list-disc pl-5 space-y-1.5 text-sm  text-foreground/80">
        {items?.map((it, idx) => (
          <li key={idx} className="leading-relaxed">
            {it}
          </li>
        ))}
      </ul>

      {title2 && items2 && (
        <>
          <h3 className="text-xs mt-8  font-semibold tracking-wider text-muted-foreground mb-3 uppercase">
            {title2}
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm  text-foreground/80">
            {items2.map((it, idx) => (
              <li key={idx} className="leading-relaxed">
                {it}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const BusinessModelCanvas: React.FC<Props> = ({ data, className }) => {
  const d: BMCData = {
    ...defaultData,
    ...data,
    keyPartnerships: data?.keyPartnerships ?? defaultData.keyPartnerships,
    keyActivities: data?.keyActivities ?? defaultData.keyActivities,
    valueProposition: data?.valueProposition ?? defaultData.valueProposition,
    managementFinancing:
      data?.managementFinancing ?? defaultData.managementFinancing,
    customerRelationships:
      data?.customerRelationships ?? defaultData.customerRelationships,
    keyResources: data?.keyResources ?? defaultData.keyResources,
    channels: data?.channels ?? defaultData.channels,
    costStructure: data?.costStructure ?? defaultData.costStructure,
    revenueStreams: data?.revenueStreams ?? defaultData.revenueStreams,
  };

  return (
    <div className={clsx("w-full", className)}>
      {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 5 cols in a 3-row canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-3 gap-4">
        {/* Column 1 */}
        <SectionCard
          title="Key Partnerships"
          items={d.keyPartnerships}
          className="lg:row-span-2 lg:row-start-1 lg:col-start-1 lg:col-end-2"
        />

        {/* Column 2 (top/bottom) */}
        <SectionCard
          title="Key Activities"
          items={d.keyActivities}
          className="lg:row-start-1 lg:col-start-2 lg:col-end-3"
        />
        <SectionCard
          title="Key Resources"
          items={d.keyResources}
          className="lg:row-start-2 lg:col-start-2 lg:col-end-3"
        />

        {/* Column 3 (spans two rows) */}
        <SectionCard
          title="Value Proposition"
          items={d.valueProposition}
          className="lg:row-span-2 lg:row-start-1 lg:col-start-3 lg:col-end-4"
          title2="Management & Financing"
          items2={d.managementFinancing}
        />

        {/* Column 4 (top/bottom) */}
        <SectionCard
          title="Customer Relationships"
          items={d.customerRelationships}
          className="lg:row-start-1 lg:col-start-4 lg:col-end-5"
        />
        <SectionCard
          title="Channels"
          items={d.channels}
          className="lg:row-start-2 lg:col-start-4 lg:col-end-5"
        />

        {/* Column 5 (spans two rows) */}
        <div
          className={clsx(
            "rounded-2xl border border-border bg-card shadow-md transition-all duration-200",
            "hover:shadow-lg hover:-translate-y-0.5",
            "p-5 md:p-6",
            "lg:row-span-2 lg:row-start-1 lg:col-start-5 lg:col-end-6"
          )}
        >
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground mb-3 uppercase">
            Customer Segments{" "}
            <span className="text-muted-foreground">(SMMEs)</span>
          </h3>

          <h4 className="text-sm font-semibold tracking-wider text-muted-foreground mb-3 mt-4">
            Age/Life Cycle
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground/80">
            <li className="leading-relaxed">New</li>
            <li className="leading-relaxed">Existing</li>
            <li className="leading-relaxed">Entrepreneurial ideas</li>
          </ul>

          <h4 className="text-sm font-semibold tracking-wider text-muted-foreground mb-3 mt-4">
            Business Condition
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground/80">
            <li className="leading-relaxed">Ailing</li>
            <li className="leading-relaxed">Acquired</li>
            <li className="leading-relaxed">Merged</li>
          </ul>

          <h4 className="text-sm font-semibold tracking-wider text-muted-foreground mb-3 mt-4">
            Industry
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground/80">
            <li className="leading-relaxed">IT/Fintech</li>
            <li className="leading-relaxed">Agric and Agroallied</li>
            <li className="leading-relaxed">General Services</li>
            <li className="leading-relaxed">Manufacturing</li>
          </ul>
        </div>

        {/* Bottom row */}
        <SectionCard
          title="Cost Structure"
          items={d.costStructure}
          className="lg:row-start-3 lg:col-start-1 lg:col-end-4"
        />
        <SectionCard
          title="Revenue Streams"
          items={d.revenueStreams}
          className="lg:row-start-3 lg:col-start-4 lg:col-end-6"
        />
      </div>
    </div>
  );
};

export default BusinessModelCanvas;
