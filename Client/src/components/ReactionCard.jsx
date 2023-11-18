import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTablets } from "@fortawesome/free-solid-svg-icons";

const drugNames = [
  "Paracetamol",
  "Aspirin",
  "Acetalgin",
  "Ibuprofen",
  "Panadol",
  "Paracetamol",
  "Aspirin",
  "Acetalgin",
  "Ibuprofen",
  "Panadol",
];

const CustomCardHeader = ({ leftContent, rightContent }) => {
  return (
    <div
      style={{
        padding: 16,
        paddingBottom: 0,
        display: "flex",
        justifyContent: "space-between",
      }}>
      <div>{leftContent}</div>
      <div>{rightContent}</div>
    </div>
  );
};

const ReactionCard = () => {
  return (
    <div className='flex gap-8'>
      {drugNames.map((drugName) => (
        <Card
          className='hover:scale-110 hover:transition hover:duration-500'
          sx={{
            width: 250,
            height: 250,
            borderRadius: 4,
          }}>
          <CustomCardHeader
            leftContent={<Typography variant='h6'>{drugName}</Typography>}
            rightContent={
              <Typography className=' text-[18px]'>
                <FontAwesomeIcon icon={faTablets} />{" "}
              </Typography>
            }
          />
          <CardContent sx={{ color: "black" }}>
            <Typography variant='body2' color='text.secondary'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              excepturi placeat nostrum cupiditate repudiandae aut, iusto
              corporis eius explicabo impedit esse aliquam unde temporibus quo
              neque incidunt corrupti iure debitis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReactionCard;
