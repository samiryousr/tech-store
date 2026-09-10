import React from "react";

type SwitchProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <label htmlFor="theme-toggle" className="theme-switch" aria-label="Toggle dark mode">
      <span className="theme-switch__toggle-wrap">
        <input
          id="theme-toggle"
          className="theme-switch__toggle"
          type="checkbox"
          role="switch"
          name="theme"
          checked={checked}
          onChange={onChange}
          aria-checked={checked}
        />
        <span className="theme-switch__icon" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <span className="theme-switch__icon-part" key={index} />
          ))}
        </span>
      </span>
      <style jsx>{`
        .theme-switch {
          --primary: #3c50e0;
          --primaryT: rgba(60, 80, 224, 0.35);
          --transDur: 0.3s;
          display: flex;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
        }

        .theme-switch__icon,
        .theme-switch__toggle {
          z-index: 1;
        }

        .theme-switch__icon,
        .theme-switch__icon-part,
        .theme-switch__toggle-wrap,
        .theme-switch__toggle {
          position: relative;
        }

        .theme-switch__icon,
        .theme-switch__icon-part {
          position: absolute;
        }

        .theme-switch__icon {
          top: 0.25em;
          left: 0.25em;
          width: 0.875em;
          height: 0.875em;
          pointer-events: none;
          transition: transform var(--transDur) ease-in-out;
        }

        .theme-switch__icon-part {
          border-radius: 50%;
          box-shadow: 0.23em -0.23em 0 0.28em hsl(0, 0%, 100%) inset;
          top: calc(50% - 0.29em);
          left: calc(50% - 0.29em);
          width: 0.58em;
          height: 0.58em;
          transition:
            box-shadow var(--transDur) ease-in-out,
            opacity var(--transDur) ease-in-out,
            transform var(--transDur) ease-in-out;
          transform: scale(0.5);
        }

        .theme-switch__icon-part ~ .theme-switch__icon-part {
          background-color: hsl(0, 0%, 100%);
          border-radius: 0.03em;
          top: 50%;
          left: calc(50% - 0.03em);
          transform: rotate(0deg) translateY(0.29em);
          transform-origin: 50% 0;
          width: 0.06em;
          height: 0.12em;
        }

        .theme-switch__icon-part:nth-child(3) { transform: rotate(45deg) translateY(0.26em); }
        .theme-switch__icon-part:nth-child(4) { transform: rotate(90deg) translateY(0.26em); }
        .theme-switch__icon-part:nth-child(5) { transform: rotate(135deg) translateY(0.26em); }
        .theme-switch__icon-part:nth-child(6) { transform: rotate(180deg) translateY(0.26em); }
        .theme-switch__icon-part:nth-child(7) { transform: rotate(225deg) translateY(0.26em); }
        .theme-switch__icon-part:nth-child(8) { transform: rotate(270deg) translateY(0.29em); }
        .theme-switch__icon-part:nth-child(9) { transform: rotate(315deg) translateY(0.29em); }

        .theme-switch__toggle-wrap {
          display: block;
          margin: 0 0.35em;
        }

        .theme-switch__toggle,
        .theme-switch__toggle::before {
          display: block;
        }

        .theme-switch__toggle {
          background-color: hsl(48, 90%, 85%);
          border: 0;
          border-radius: 25% / 50%;
          box-shadow: 0 0 0 0.125em var(--primaryT);
          padding: 0.15em;
          width: 3.5em;
          height: 1.75em;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
          transition:
            background-color var(--transDur) ease-in-out,
            box-shadow 0.15s ease-in-out,
            transform var(--transDur) ease-in-out;
        }

        .theme-switch__toggle::before {
          background-color: hsl(48, 90%, 55%);
          border-radius: 50%;
          content: "";
          width: 1.45em;
          height: 1.45em;
          transition: transform var(--transDur) ease-in-out, background-color var(--transDur) ease-in-out;
        }

        .theme-switch__toggle:focus-visible {
          box-shadow: 0 0 0 0.125em var(--primary);
          outline: transparent;
        }

        .theme-switch__toggle:checked {
          background-color: hsl(198, 90%, 15%);
        }

        .theme-switch__toggle:checked::before,
        .theme-switch__toggle:checked ~ .theme-switch__icon {
          transform: translateX(1.75em);
        }

        .theme-switch__toggle:checked::before {
          background-color: hsl(198, 90%, 55%);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(1) {
          box-shadow: 0.12em -0.12em 0 0.12em hsl(0, 0%, 100%) inset;
          transform: scale(1);
          top: 0.12em;
          left: -0.12em;
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part ~ .theme-switch__icon-part {
          opacity: 0;
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(2) {
          transform: rotate(45deg) translateY(0.8em);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(3) {
          transform: rotate(90deg) translateY(0.8em);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(4) {
          transform: rotate(135deg) translateY(0.8em);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(5) {
          transform: rotate(180deg) translateY(0.8em);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(6) {
          transform: rotate(225deg) translateY(0.8em);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(7) {
          transform: rotate(270deg) translateY(0.8em);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(8) {
          transform: rotate(315deg) translateY(0.8em);
        }

        .theme-switch__toggle:checked ~ .theme-switch__icon .theme-switch__icon-part:nth-child(9) {
          transform: rotate(360deg) translateY(0.8em);
        }
      `}</style>
    </label>
  );
};

export default Switch;
