import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
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
          leftContent={
            <Typography variant='h6' className=' font-bold'>
              {props.drugName}
            </Typography>
          }
          rightContent={
            <Typography>
              <Chip
                label={props.riskInfo}
                style={{ backgroundColor: props.riskColor, fontSize: "12px" }}
              />
            </Typography>
          }
          subHeader={
            <Typography className='text-[16px]'>
              {props.possibleInteractions}
            </Typography>
          }
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
