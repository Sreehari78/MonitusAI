import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTablets } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CustomCardHeader = ({ leftContent, rightContent, subHeader }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        paddingBottom: 0,
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div>{leftContent}</div>
        <div>{rightContent}</div>
      </div>
      <div>{subHeader}</div>
    </div>
  );
};

const ReactionCard = (props) => {
  return (
    <div className='flex gap-8'>
      <Card
        className='hover:scale-110 hover:transition hover:duration-500'
        sx={{
          width: 250,
          height: 250,
          borderRadius: 4,
        }}>
        <CustomCardHeader
          leftContent={<Typography variant='h6'>{props.drugName}</Typography>}
          rightContent={
            <Typography className=' text-[18px]'>
              <FontAwesomeIcon icon={faTablets} />{" "}
            </Typography>
          }
          subHeader={<Typography>{props.possibleInteractions}</Typography>}
        />
        <CardContent sx={{ color: "black" }}>
          <Typography variant='body2' color='text.secondary'>
            {props.sideEffects}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReactionCard;
