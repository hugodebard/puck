import styles from "./styles.module.css";
import getClassNameFactory from "../../lib/get-class-name-factory";
import { ReactNode } from "react";
import { useAppStore } from "../../store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

const getClassName = getClassNameFactory("FieldGroup", styles);

export const FieldGroup = ({
  children,
  title,
  id,
  defaultExpanded = false,
}: {
  id: string;
  children?: ReactNode;
  title?: string;
  defaultExpanded?: boolean;
}) => {
  const setUi = useAppStore((s) => s.setUi);
  const fieldGroups = useAppStore(
    useShallow((s) => s.state.ui.fieldGroups || {})
  );

  const { expanded = defaultExpanded } = fieldGroups[id] || {};

  return (
    <div className={getClassName({ isExpanded: expanded })}>
      {title && (
        <button
          type="button"
          className={getClassName("title")}
          onClick={() =>
            setUi({
              fieldGroups: {
                ...fieldGroups,
                [id]: {
                  ...fieldGroups[id],
                  expanded: !expanded,
                },
              },
            })
          }
          title={
            expanded
              ? `Collapse${title ? ` ${title}` : ""}`
              : `Expand${title ? ` ${title}` : ""}`
          }
        >
          <div>{title}</div>
          <div className={getClassName("titleIcon")}>
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </div>
        </button>
      )}
      <div className={getClassName("content")}>{children}</div>
    </div>
  );
};
