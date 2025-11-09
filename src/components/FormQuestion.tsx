"use client";

import { FormOption } from "@/types";
import { motion } from "framer-motion";

interface FormQuestionProps {
  options: FormOption[];
  onSelect: (option: FormOption) => void;
}

export default function FormQuestion({ options, onSelect }: FormQuestionProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Choose an option to continue:
      </p>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)}
            className="w-full text-left px-4 py-3 bg-white dark:bg-gray-800 border-2 border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 text-gray-900 dark:text-gray-100 font-medium shadow-sm hover:shadow-md"
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
