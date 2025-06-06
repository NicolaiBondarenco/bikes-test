import React, {useState, FormEvent, memo} from 'react';
import Button from "@/components/Button/Button";

import styles from './BikeForm.module.scss';

type BikeFormProps = {
	initialUser: string;
	status: 'Active' | 'Inactive';
	onSubmit: (user: string) => void;
}

const BikeForm = memo<BikeFormProps>(({ initialUser, status, onSubmit }) => {
	const [user, setUser] = useState(initialUser);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(user);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			{status === 'Inactive' && (
				<input
					type="text"
					placeholder="Enter user name"
					value={user}
					onChange={(e) => setUser(e.target.value)}
					required
					className={styles.input}
				/>
			)}
			<Button type={"submit"}>{status === 'Active' ? 'Set Inactive' : 'Set Active'}</Button>
		</form>
	);
})

BikeForm.displayName = "BikeForm";

export default BikeForm;
