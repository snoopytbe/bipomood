import React, { useEffect, useState } from "react";
import { Rating, Stack, Typography, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DateAdapter from "@mui/lab/AdapterMoment";
import { MobileDatePicker, LocalizationProvider } from "@mui/lab";
import awsconfig from "./aws-exports";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listMoodss } from "./graphql/queries";
import { createMoods, updateMoods } from "./graphql/mutations";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";

Amplify.configure(awsconfig);

moment.locale("fr");

const App = () => {
  const [moods, setMoods] = useState([]);
  const [dateCourante, setDateCourante] = useState(
    moment().format("YYYY-MM-DD")
  );

  async function saveData(event) {
    //console.log(JSON.stringify(event));
    try {
      if (event.id) {
        await API.graphql(
          graphqlOperation(updateMoods, {
            input: {
              date: event.date,
              deprime: event.deprime + "",
              angoisse: event.angoisse + "",
              enervement: event.enervement + "",
              fatigue: event.fatigue + "",
              comment: event.comment || "",
              id: event.id,
            },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(createMoods, {
            input: {
              date: event.date + "",
              deprime: event.deprime + "",
              angoisse: event.angoisse + "",
              enervement: event.enervement + "",
              fatigue: event.fatigue + "",
              comment: event.comment || "",
            },
          })
        );
      }
    } catch (err) {
      console.log("error creating moods");
    }
  }

  const { control, handleSubmit, reset, getValues, register } = useForm();

  useEffect(() => {
    async function fetchMoods() {
      try {
        let filter = {
          date: {
            eq: dateCourante,
          },
        };
        const moodData = await API.graphql({
          query: listMoodss,
          variables: { filter: filter },
        });
        setMoods(moodData.data.listMoodss.items[0]);
        //console.log(JSON.stringify(moodData.data.listMoodss.items[0]));
      } catch (err) {
        console.log("error fetching moods");
      }
    }
    const newMoods = fetchMoods(dateCourante);
    setMoods(newMoods);
  }, [dateCourante]);

  useEffect(() => {
    setDateCourante(moment().format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    reset({
      date: dateCourante,
      id: moods?.id,
      deprime: moods?.deprime | "0",
      angoisse: moods?.angoisse | "0",
      fatigue: moods?.fatigue | "0",
      enervement: moods?.enervement | "0",
      comment: moods?.comment | "",
    });
  }, [reset, moods, dateCourante]);

  const onSubmit = (update) => {
    saveData(update);
  };

  const onChangeData = () => {
    saveData(getValues());
  };

  const onChangeDateHandler = (date) => {
    setDateCourante(moment(date).format("YYYY-MM-DD"));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              Humeurs
            </Typography>

            <input type="hidden" {...register("id")} />

            <LocalizationProvider
              dateAdapter={DateAdapter}
              utils={MomentUtils}
              locale="fr"
            >
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MobileDatePicker
                    onChange={(date) => {
                      onChange();
                      onChangeDateHandler(date);
                    }}
                    disableCloseOnSelect={false}
                    value={value}
                    renderInput={(params) => (
                      <TextField sx={{ paddingBottom: "10px" }} {...params} />
                    )}
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
                  onChange={(e) => {
                    onChange(e.target.value);
                    onChangeData();
                  }}
                  sx={{ paddingBottom: "10px" }}
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
                  onChange={(e) => {
                    onChange(e.target.value);
                    onChangeData();
                  }}
                  sx={{ paddingBottom: "10px" }}
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
                  onChange={(e) => {
                    onChange(e.target.value);
                    onChangeData();
                  }}
                  sx={{ paddingBottom: "10px" }}
                />
              )}
            />

            <Typography sx={{ fontSize: 16 }}>Enervement :</Typography>

            <Controller
              name="enervement"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Rating
                  value={parseInt(value) || 0}
                  defaultValue={1}
                  onChange={(e) => {
                    onChange(e.target.value);
                    onChangeData();
                  }}
                  sx={{ paddingBottom: "10px" }}
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
                  onChange={(e) => {
                    onChange(e.target.value);
                    onChangeData();
                  }}
                  sx={{ width: 260, paddingBottom: "20px" }}
                  label="Commentaire"
                  multiline
                  rows={4}
                />
              )}
            />
            <Stack
              spacing={10}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDateCourante(
                    moment(dateCourante).add(-1, "days").format("YYYY-MM-DD")
                  );
                }}
              >
                &lt;&lt;
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDateCourante(
                    moment(dateCourante).add(1, "days").format("YYYY-MM-DD")
                  );
                }}
              >
                &gt;&gt;
              </Button>
            </Stack>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default App;
