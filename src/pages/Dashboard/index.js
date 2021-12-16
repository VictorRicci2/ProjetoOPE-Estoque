import React, { useEffect } from "react";
import { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import { tarefas } from "../../variables/general";

import styles from "./dashboardStyle.js";

import { getAllProducts } from "models/products/products";
import { getAllProviders } from "models/providers/providers";
import { getAllExitProducts } from "models/exitProducts/exitProducts";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [inventory, setInventory] = useState(0);
  const [providers, setProviders] = useState(0);
  const [fornecedor, setFornecedor] = useState([]);
  const [exitProducts, setExitProducts] = useState(0);

  async function getAll() {
    const dataProduct = await getAllProducts();
    if (dataProduct.length) {
      const estoqueTotal = dataProduct.reduce(
        (acc, cur) => (acc = acc + Number(cur.quantity)),
        0
      );
      setInventory(estoqueTotal);
      console.log(inventory);
    }
    const dataProvider = await getAllProviders();
    if (dataProvider.length) {
      const fornecedorTotal = dataProvider.length;
      setProviders(fornecedorTotal);
      setFornecedor(dataProvider);
    }
    const dataExit = await getAllExitProducts();
    if (dataExit.length) {
      const saidaTotal = dataExit.length;
      setExitProducts(saidaTotal);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                <Icon>Total Estoque</Icon>
              </CardIcon>
              <br />
              <h3 className={classes.cardTitle}>
                {`${inventory}/500 `}
                <small>produtos</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <div className={classes.stats}>
                  <DateRange />
                  Últimas 24 Horas
                </div>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Entrada Produto</p>
              <h3 className={classes.cardTitle}>{`${inventory}/500 `}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Últimas 24 Horas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Saída Produto</p>
              <h3 className={classes.cardTitle}>{`${exitProducts}/500 `}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Últimas 24 Horas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Fornecedores</p>
              <h3 className={classes.cardTitle}>{`${providers}/100 `}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Total Cadastrados
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer></GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Tarefas",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={tarefas}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Funcionários Registrados
              </h4>
              <p className={classes.cardCategoryWhite}>
                Lista de funcionários registrados
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={["Nome", "Telefone", "E-mail"]}
                tableData={fornecedor.map((fornecedor) => {
                  return [
                    fornecedor.name,
                    fornecedor.cellphone,
                    fornecedor.email,
                  ];
                })}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
