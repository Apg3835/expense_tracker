class apiExpenseTrackerServices {
  BASE_URL = "https://expensetracker-d78a0-default-rtdb.firebaseio.com/";
  static getInstance() {
    return new apiExpenseTrackerServices();
  }
  addExpense = async (expenseData) => {
    console.log(3, expenseData);
    const localId = expenseData.localId;
    // const localId = localStorage.getItem("localId");
    // console.log(localId);
    const response = await fetch(
      this.BASE_URL + localId + "/expenseItem.json",
      {
        method: "POST",
        body: JSON.stringify({
          id: expenseData.id,
          description: expenseData.expenseDescription,
          amount: expenseData.expenseAmount,
          type: expenseData.expenseType,
          date: expenseData.expenseDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      alert("data sends successfuly");
    } else {
      const data = await response.json();
      alert(data.error.message);
    }
  };
  getExpense = async (localId) => {
    // console.log(3, localId);
    // const localId = localStorage.getItem("localId");
    // console.log(localId);
    const response = await fetch(
      this.BASE_URL + localId + "/expenseItem.json",
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      const data = await response.json();
      alert(data.error.message);
    }
  };
  deleteExpense = async (data) => {
    // console.log(3, data);
    const key = data.key;
    // console.log(key);
    const localId = data.localId;
    // console.log(localId);

    const response = await fetch(
      this.BASE_URL + localId + "/expenseItem/" + key + ".json",
      {
        method: "DELETE",
        redirect: "follow",
      }
    );

    if (response.ok) {
      const data = await response.json();

      return data;
    }
  };
  editExpense = async (data) => {
    console.log(3, data);
    const key = data.key;
    console.log(key);
    const localId = data.localId;
    console.log(localId);

    const response = await fetch(
      this.BASE_URL + localId + "/expenseItem/" + key + ".json",
      {
        method: "PATCH",
        body: JSON.stringify({
          description: data.description,
          amount: data.amount,
          type: data.type,
          date: data.date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  };
}
export default apiExpenseTrackerServices =
  apiExpenseTrackerServices.getInstance();
