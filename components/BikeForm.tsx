import React, {useState, FormEvent, memo} from 'react';

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
		<form onSubmit={handleSubmit}>
			{status === 'Inactive' && (
				<input
					type="text"
					placeholder="Enter user name"
					value={user}
					onChange={(e) => setUser(e.target.value)}
					required
				/>
			)}
			<button type="submit">
				{status === 'Active' ? 'Set Inactive' : 'Set Active'}
			</button>
		</form>
	);
})

BikeForm.displayName = "BikeForm";

export default BikeForm;
