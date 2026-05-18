import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/Icon";

interface SortOption<T> {
  label: string;
  value: T;
}

interface SortDropdownProps<T> {
  value: T;
  options: SortOption<T>[];
  onChange: (value: T) => void;
}

export default function SortDropdown<T extends string>({
  value,
  options,
  onChange,
}: SortDropdownProps<T>) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((option) => option.value === value)?.label || "Sort";

  useEffect(() => {
    const details = detailsRef.current;

    if (!details) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!details.contains(event.target as Node)) {
        setIsOpen(false);

        setTimeout(() => {
          details.open = false;
        }, 180);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function handleToggle(event: React.MouseEvent) {
    event.preventDefault();

    const details = detailsRef.current;

    if (!details) return;

    if (!isOpen) {
      details.open = true;

      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    } else {
      setIsOpen(false);

      setTimeout(() => {
        details.open = false;
      }, 180);
    }
  }

  function handleSelect(optionValue: T) {
    onChange(optionValue);

    setIsOpen(false);

    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.open = false;
      }
    }, 180);
  }

  return (
    <details
      ref={detailsRef}
      className="relative w-fit"
    >
      <summary
        onClick={handleToggle}
        className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <Icon name="ArrowUpDown" size={18} />

        <span className="hidden sm:inline">
          {selectedOption}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="hidden sm:block"
        >
          <Icon
            name="ChevronDown"
            size={16}
            className="text-slate-500"
          />
        </motion.div>
      </summary>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-10 mt-2 w-56 overflow-hidden rounded-md border border-slate-200 bg-white p-2 shadow-lg"
          >
            <div className="space-y-1">
              {options.map((option) => {
                const active = option.value === value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      active
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </details>
  );
}
