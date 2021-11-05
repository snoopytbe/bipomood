import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import awsconfig from "./aws-exports";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listMoods } from "./graphql/queries";
import { createMoods, updateMoods } from "./graphql/mutations";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";
import { visuallyHidden } from "@mui/utils";

Amplify.configure(awsconfig);

moment.locale("fr");

const App = () => {
  const [moods, setMoods] = useState([]);
  const [dateCourante, setDateCourante] = useState("2021-11-01");

  async function saveData(event) {
    try {
      if (event.id) {
        await API.graphql(
          graphqlOperation(updateMoods, {
            input: {
              date: event.date,
              deprime: event.deprime,
              angoisse: event.angoisse,
              fatigue: event.fatigue,
              comment: event.comment || "",
              id: event.id,
            },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(createMoods, {
            input: {
              date: event.date,
              deprime: event.deprime,
              angoisse: event.angoisse,
              fatigue: event.fatigue,
              comment: event.comment || "",
            },
          })
        );
      }
    } catch (err) {
      console.log("error creating moods");
    }
  }

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchMoods() {
      try {
        let filter = {
          date: {
            eq: dateCourante,
          },
        };
        const moodData = await API.graphql({
          query: listMoods,
          variables: { filter: filter },
        });
        setMoods(moodData.data.listMoods.items[0]);
      } catch (err) {
        console.log("error fetching moods");
      }
    }

    setMoods(fetchMoods(dateCourante));
  }, [dateCourante]);

  useEffect(() => {
    setDateCourante("2021-11-01");
  }, []);

  useEffect(() => {
    if (moods !== undefined && "date" in moods) {
      reset(moods);
    } else {
      reset({ date: dateCourante, deprime: "3", angoisse: "3", comment: "" });
    }
  }, [reset, moods, dateCourante]);

  const onSubmit = (update) => {
    saveData(update);
  };

  const onChangeDateHandler = (date) => {
    setDateCourante(moment(date).format("YYYY-MM-DD"));
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h5">Humeurs</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField disabled sx={visuallyHidden} id="id" />
        <LocalizationProvider
          dateAdapter={DateAdapter}
          utils={MomentUtils}
          locale="fr"
        >
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                onChange={(date) => {
                  onChange();
                  onChangeDateHandler(date);
                }}
                value={value || 0}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
        </LocalizationProvider>
        <Typography sx={{ fontSize: 16 }}>Déprime :</Typography>
        <Controller
          name="deprime"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Rating
              value={parseInt(value) || 0}
              defaultValue={1}
              onChange={onChange}
            />
          )}
        />
        <Typography sx={{ fontSize: 16 }}>Angoisse :</Typography>
        <Controller
          name="angoisse"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Rating
              value={parseInt(value) || 0}
              defaultValue={1}
              onChange={onChange}
            />
          )}
        />
        <Typography sx={{ fontSize: 16 }}>Fatigue :</Typography>
        <Controller
          name="fatigue"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Rating
              value={parseInt(value) || 0}
              defaultValue={1}
              onChange={onChange}
            />
          )}
        />
        <Typography variant="h6" />
        <Controller
          name="comment"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value || ""}
              label="Commentaire"
              multiline
              rows={4}
              onChange={onChange}
            />
          )}
        />
        <Typography variant="h1" />
        <Button variant="contained" color="primary" type="submit">
          Enregistrer
        </Button>
      </form>
    </div>
  );
};

export default App;
