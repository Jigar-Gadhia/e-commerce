import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/Icon";

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: number[];
  onToggle: (categoryId: number) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onToggle,
}: CategoryFilterProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <details
      ref={detailsRef}
      className="relative w-fit"
    >
      <summary
        onClick={handleToggle}
        className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <Icon name="Filter" size={18} />

        <span className="hidden sm:inline">
          {selectedCategories.length > 0
            ? `${selectedCategories.length} filter${
                selectedCategories.length > 1 ? "s" : ""
              } selected`
            : "Select filters"}
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
            className="absolute left-0 z-10 mt-2 w-56 overflow-hidden rounded-md border border-slate-200 bg-white p-3 shadow-lg"
          >
            <div className="space-y-2">
              {categories.map((category) => {
                const checked = selectedCategories.includes(category.id);

                return (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(category.id)}
                      className="h-4 w-4 rounded border-slate-300"
                    />

                    <span>{category.name}</span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </details>
  );
}
