import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ReactionReport = (props) => {
  const handleDelete = () => {
    props.onDelete(props.drug);
  };
  return (
    <div className=' flex gap-8'>
      <Card
        className='hover:scale-110 hover:transition hover:duration-500'
        sx={{
          width: 150,
          height: 50,
          borderRadius: 4,
        }}>
        <CardContent sx={{ color: "black" }}>
          <div className='flex justify-between'>
            <Typography
              variant='body2'
              color='text.secondary'
              fontSize={"12px"}>
              {props.drug}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              onClick={handleDelete}>
              <CheckIcon style={{ color: "#008081", fontSize: "18px" }} />
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReactionReport;
