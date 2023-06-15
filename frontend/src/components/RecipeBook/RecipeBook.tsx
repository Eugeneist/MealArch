import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import styles from './RecipeBook.module.scss';

interface RecipeBookProps {
  onClick?: (componentId: number) => void;
  selectedComponent: number;
}

const RecipeBook: React.FC<RecipeBookProps> = ({
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
        <div onClick={() => handleClick(2)} className={styles.book}>
          <h4>Recipe Book</h4>
        </div>
      )}

      {selectedComponent === 2 && (
        <div className={styles.book}>
          <p>Inside Book</p>
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

export default RecipeBook;
