import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const JobListing = ({ items, handleRequest }) =>
	items?.map((job) => (
		<Box sx={{ minWidth: 275, padding: '5px' }} style={{ cursor: 'pointer' }} key={job?.ciphertext}>
			<Card
				sx={{
					border: `${job?.isRead ? '1.5px solid black' : '3.5px solid yellow'}`,
				}}
				onClick={() => handleRequest(job?.ciphertext)}
			>
				<CardContent>
					<Box>
						<Typography variant='h5' component='div'>
							{job?.title}
						</Typography>
					</Box>
					<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
						{job?.description}
					</Typography>
					<Box sx={{ color: 'black' }}>
						<Typography component='div'>{`Customer Score ${job?.customer_score}  `}</Typography>
						<Typography component='div'>{`Location Score ${job?.location_score}`}</Typography>
					</Box>
				</CardContent>
			</Card>
		</Box>
	));

export default JobListing;
