import type { ReactNode } from "react";
import Card from "./Card";

const inputClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const rowClass =
  "-mx-4 flex flex-col gap-3 border-b border-border px-4 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8";

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-3">
    <div>
      <h2 className="text-base font-medium">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
    <Card>{children}</Card>
  </section>
);

const Row = ({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) => (
  <div className={rowClass}>
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-sm text-muted-foreground">{hint}</p>}
    </div>
    <div className="sm:w-64 sm:shrink-0">{children}</div>
  </div>
);

const ToggleRow = ({
  label,
  hint,
  defaultChecked = false,
}: {
  label: string;
  hint: string;
  defaultChecked?: boolean;
}) => (
  <label className="-mx-4 flex cursor-pointer items-center justify-between gap-6 border-b border-border px-4 py-4 first:pt-0 last:border-b-0 last:pb-0">
    <div className="min-w-0">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{hint}</p>
    </div>
    <span className="relative inline-flex h-5 w-9 shrink-0">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="absolute inset-0 rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50" />
      <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
    </span>
  </label>
);

const Settings = () => {
  return (
    <div className="flex max-w-4xl flex-col gap-8 pb-12">
      <header>
        <h1 className="text-2xl font-medium tracking-tight lg:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile, preferences and notifications.
        </p>
      </header>

      {/* Profile */}
      <Section title="Profile" description="How you appear in the workspace.">
        <div className="-mx-4 flex items-center gap-4 border-b border-border px-4 pb-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
            A
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">a</p>
            <p className="truncate text-sm text-muted-foreground">
              kaan@example.com
            </p>
          </div>
        </div>
        <div className="flex flex-col pt-2">
          <Row label="Full name" htmlFor="full-name">
            <input id="full-name" defaultValue="a" className={inputClass} />
          </Row>
          <Row label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              defaultValue="kaan@example.com"
              className={inputClass}
            />
          </Row>
          <Row
            label="GitHub username"
            hint="Used for commit activity on Overview."
            htmlFor="github"
          >
            <input
              id="github"
              defaultValue="kaan-developer"
              className={inputClass}
            />
          </Row>
        </div>
      </Section>

      {/* Preferences */}
      <Section
        title="Preferences"
        description="Defaults for language and dates."
      >
        <Row label="Language" hint="Interface language." htmlFor="language">
          <select id="language" defaultValue="en" className={inputClass}>
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </Row>
        <Row
          label="Week starts on"
          hint="Used in activity views."
          htmlFor="week"
        >
          <select id="week" defaultValue="monday" className={inputClass}>
            <option value="monday">Monday</option>
            <option value="sunday">Sunday</option>
          </select>
        </Row>
      </Section>

      {/* Notifications */}
      <Section
        title="Notifications"
        description="Choose what you want to hear about."
      >
        <ToggleRow
          label="New commits"
          hint="When activity is detected in your repositories."
          defaultChecked
        />
        <ToggleRow
          label="Weekly summary"
          hint="A recap of your week every Monday."
          defaultChecked
        />
        <ToggleRow
          label="Project updates"
          hint="When a project status changes."
        />
      </Section>

      {/* Data */}
      <Section title="Data" description="Everything is stored in this browser.">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div>
            <p className="text-sm font-medium">Clear projects</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Remove all tracked projects. This cannot be undone.
            </p>
          </div>
          <button
            type="button"
            className="h-8 shrink-0 rounded-lg border border-input px-3 text-sm text-destructive transition-colors hover:bg-secondary"
          >
            Clear
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Settings;
