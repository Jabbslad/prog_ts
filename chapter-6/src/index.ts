type ExistingUser = {
  id: number;
  name: string;
};

type NewUser = {
  name: string;
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}

let existingUser: ExistingUser = {
  id: 1,
  name: "Jabbslad"
};

console.log(existingUser);
deleteUser(existingUser);
console.log(existingUser);

type LegacyUser = {
  id: number | string;
  name: string;
};

let legacyUser: LegacyUser = {
  id: "1234567",
  name: "Xin Yang"
};

//deleteUser(legacyUser);
