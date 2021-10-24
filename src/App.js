import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import awsconfig from "./aws-exports";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listMoods } from "./graphql/queries";
import { createMoods } from "./graphql/mutations";
import moment from "moment";

Amplify.configure(awsconfig);

const App = () => {
  const [moods, setMoods] = useState([]);

  async function createData() {
    try {
      await API.graphql(graphqlOperation(createMoods, { input: { date: moment().toDate(), deprime: 3, angoisse: 3, comment: "" } }));
    } catch (err) {
      console.log("error creating moods");
    }
  }

  // Création du formulaire initialisé avec les données de la loge
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchMoods() {
      try {
        const moodData = await API.graphql(graphqlOperation(listMoods));
        const moods = moodData.data.listMoods.items;
        setMoods(moods[0]);
        reset(moods[0]);
        console.log(moods[0]);
      } catch (err) {
        console.log("error fetching moods");
      }
    }
    fetchMoods();
  }, [reset]);

  // Lors de la validation du formulaire mise à jour de LogeBooking
  const onSubmit = (update) => {};

  return (
    <div>
      <Typography variant="h5">Humeurs</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => <DatePicker {...field} renderInput={(params) => <TextField {...params} />} />}
          />
        </LocalizationProvider>
        <Typography sx={{ fontSize: 16 }}>Déprime :</Typography>
        <Controller
          name="deprime"
          control={control}
          render={({ field: { onChange, value } }) => <Rating value={value || 0} defaultValue={1} onChange={onChange} />}
        />
        <Typography sx={{ fontSize: 16 }}>Angoisse :</Typography>
        <Controller
          name="angoisse"
          control={control}
          render={({ field: { onChange, value, name } }) => <Rating value={value || 0} defaultValue={1} onChange={onChange} />}
        />
        <br />
        <Controller
          name="comment"
          control={control}
          render={({ field: { value } }) => <TextField value={value || ""} label="Commentaire" multiline rows={4} />}
        />
      </form>
    </div>
  );
};

export default App;
