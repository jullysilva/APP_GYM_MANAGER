import React, { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsFillPersonBadgeFill, BsPersonArmsUp } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, MainPainel, Wrapper } from "./Dashboard.styled";
import { getAllMembers } from "../../services/Requests/MemberService";
import { getAllExercises } from "../../services/Requests/ExercisesService";
import { Grupo } from "data/index";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const users = await getAllMembers();
    if (users.status === "success") {
      setMembers(users.data);
    }

    const exercise = await getAllExercises();
    if (exercise.status === "success") {
      setExercises(exercise.data);
    }
  };

  const getTrainers = () => {
    return members.filter((member) => member.isTrainer);
  };

  const countMembersRegisteredToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return members.filter((member) => {
      const createdAt = new Date(member.created_at);
      return createdAt >= today;
    }).length;
  };

  const countMembersByStatus = (status) => {
    return members.filter((member) => member.status === status).length;
  };

  const data = {
    labels: ["PENDENTE", "PAGO", "ATRASADO"],
    datasets: [
      {
        label: "Quantidade de Membros",
        data: [
          countMembersByStatus("PENDENTE"),
          countMembersByStatus("PAGO"),
          countMembersByStatus("ATRASADO"),
        ],
        backgroundColor: ["yellow", "green", "red"],
        borderColor: ["yellow", "green", "red"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const countExercisesByGroup = () => {
    const groupCounts = Grupo.reduce((acc, group) => {
      acc[group.value] = exercises.filter(
        (exercise) => exercise.category === group.value
      ).length;
      return acc;
    }, {});
    return groupCounts;
  };

  const exerciseData = countExercisesByGroup();

  const exerciseDataForChart = {
    labels: Grupo.map((group) => group.label),
    datasets: [
      {
        label: "Quantidade de Exercícios",
        data: Grupo.map((group) => exerciseData[group.value]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Wrapper>
      <MainPainel className="container-fluid p-4">
        <div className="content">
          <div className="row row-cols-4 g-3">
            <div className="col-12 col-lg-3 col-md-6 col-sm-6">
              <Card className="card card-stats">
                <div className="card-body">
                  <div className="row row-cols-2 gx-2">
                    <div className="col-3 align-content-center text-center">
                      <i className="nc-icon nc-globe text-warning">
                        <FaPeopleGroup fontSize={80} />
                      </i>
                    </div>
                    <div className="col-9">
                      <div className="numbers">
                        <p className="card-category">Total de membros</p>
                        <p className="card-title h1">{members.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 col-lg-3 col-md-6 col-sm-6">
              <Card className="card card-stats">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-5 col-md-4 text-center align-content-center">
                      <i className="nc-icon nc-money-coins text-success">
                        <BsFillPersonBadgeFill fontSize={80} />
                      </i>
                    </div>
                    <div className="col-7 col-md-8">
                      <div className="numbers">
                        <p className="card-category">Treinadores</p>
                        <p className="card-title h1">
                          {members.filter((member) => member.isTrainer).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 col-lg-3 col-md-6 col-sm-6">
              <Card className="card card-stats">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-5 col-md-4">
                      <div className="icon-big text-center icon-warning text-center align-content-center">
                        <i className="nc-icon nc-vector text-danger">
                          <CgGym fontSize={80} />
                        </i>
                      </div>
                    </div>
                    <div className="col-7 col-md-8">
                      <div className="numbers">
                        <p className="card-category">Exercícios</p>
                        <p className="card-title h1">{exercises.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 col-lg-3 col-md-6 col-sm-6">
              <Card className="card card-stats">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-5 col-md-4 text-center align-content-center">
                      <i className="nc-icon nc-favourite-28 text-primary">
                        <BsPersonArmsUp fontSize={80} />
                      </i>
                    </div>
                    <div className="col-7 col-md-8">
                      <div className="numbers">
                        <p className="card-category">Novos membros hoje</p>
                        <p className="card-title h1">
                          {countMembersRegisteredToday()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 col-md-12">
              <Card className="card">
                <div className="card-header ">
                  <h5 className="card-title">Status dos Membros</h5>
                </div>
                <div className="card-body ">
                  <Bar data={data} options={options} />
                </div>
              </Card>
            </div>
          </div>
          <div className="row row-cols-2 g-3">
            <div className="col-12 col-md-6">
              <Card className="card">
                <div className="card-header ">
                  <h5 className="card-title">
                    Quantidade de Exercícios por Grupo
                  </h5>
                </div>
                <div
                  className="card-body"
                  style={{ height: "400px", width: "100%" }}
                >
                  <Bar data={exerciseDataForChart} options={options} />
                </div>
              </Card>
            </div>
            <div className="col-12 col-md-6">
              <Card className="card">
                <div className="card-header">
                  <h5 className="card-title">Lista de Treinadores</h5>
                </div>
                <div className="card-body p-2">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>CREF</th>
                          <th>Nome</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getTrainers().map((trainer) => (
                          <tr key={trainer.id}>
                            <td>{trainer.cref}</td>
                            <td>{trainer.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MainPainel>
    </Wrapper>
  );
};

export default Dashboard;
