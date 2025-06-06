import { memo, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode;
};

const Button = memo<ButtonProps>(({ children, ...props }) => {
	return (
		<button
			className={styles.button}
			{...props}
		>
			{children}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;
