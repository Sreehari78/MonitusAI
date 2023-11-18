import React from "react";

const ReactionReport = () => {
  return (
    <div className=" flex gap-8">
      <Card
        className="hover:scale-110 hover:transition hover:duration-500"
        sx={{
          width: 250,
          height: 250,
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ color: "black" }}>
          <div>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              excepturi placeat nostrum cupiditate repudiandae aut, iusto
              corporis eius explicabo impedit esse aliquam unde temporibus quo
              neque incidunt corrupti iure debitis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReactionReport;
