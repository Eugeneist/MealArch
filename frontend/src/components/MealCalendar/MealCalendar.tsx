import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import styles from './MealCalendar.module.scss';

interface MealCalendarProps {
  onClick?: (componentId: number) => void;
  selectedComponent: number;
}

const MealCalendar: React.FC<MealCalendarProps> = ({
  onClick,
  selectedComponent,
}) => {
  const handleClick = (componentId: number) => {
    if (onClick) {
      onClick(componentId);
    }
  };

  return (
    <>
      {selectedComponent === 0 && (
        <div onClick={() => handleClick(1)} className={styles.calendar}>
          <h4>Meal Calendar</h4>
        </div>
      )}

      {selectedComponent === 1 && (
        <div className={styles.calendar}>
          <p>Inside Calendar</p>
          <IconButton
            onClick={() => {
              if (onClick) {
                onClick(0);
              }
            }}
            aria-label="back"
          >
            <UndoIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default MealCalendar;
