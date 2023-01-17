'use strict'

class Tinder {
    constructor() {
        this.users = [];
    }

    getUnique = (array) => {
        return array.filter((el, ind) => ind === array.indexOf(el));
    };

    signUp(userId, gender, preferredGender, age, minPreferredAge, maxPreferredAge, interests) {
        let newUser = {};

        if (+userId >= 1 && +userId <= 10000) {
            newUser.userId = userId;
        } else {
            console.log(`Sorry, you don't have add this userId: ${userId}. userId should be a number, > 1 and < 10000`)
            return;
        }

        if (+gender === 0 || +gender === 1) {
            newUser.gender = +gender;
        } else {
            console.log(`Sorry, you don't have add this gender: ${gender}. Gender should be 0 (man) or 1 (woman)`)
            return;
        }

        if (+preferredGender === 0 || +preferredGender === 1) {
            newUser.preferredGender = +preferredGender ?? 0;
        }
        else {
            console.log(`Sorry, you don't have add this preferredGender: ${preferredGender}. preferredGender should be 0 (man) or 1 (woman)`)
            return;
        }

        if (+age >= 18 && +age <= 90) {
            newUser.age = +age;
        } else {
            console.log(`Sorry, you don't have add this age: ${age}. Age should be >= 18 and <= 90`)
            return;
        }

        if (+maxPreferredAge <= minPreferredAge) {
            console.log(`Sorry, maxPreferredAge should be >= minPreferredAge`)
            return;
        }

        if (+minPreferredAge >= 18 && +minPreferredAge <= 90) {
            newUser.minPreferredAge = +minPreferredAge;
        } else {
            console.log(`Sorry, you don't have add this minPreferredAge: ${minPreferredAge}. minPreferredAge should be >= 18 and <= 90`)
            return;
        }

        if (+maxPreferredAge >= 18 && +maxPreferredAge <= 90) {
            newUser.maxPreferredAge = +maxPreferredAge ?? 0;
        } else {
            console.log(`Sorry, you don't have add this maxPreferredAge: ${maxPreferredAge}. maxPreferredAge should be >= 18 and <= 90`)
            return;
        }

        newUser.interests = this.getUnique(interests) ?? '';

        if (interests == '') {
            console.log(`Please add interests for your user`)
            return;
        }

        this.users.push(newUser);
        return newUser;
    }

    getUserDataById(userId) {
        for (let user of this.users) {
            if (user.userId == userId) {
                return user;
            }
        }
    }

    getMatches(userId) {
        const matches = [];
        let currentUser = this.getUserDataById(userId);

        if (currentUser === undefined) {
            console.log(`Sorry, we don't have user with userId=${userId}`);
            return;
        }

        for (let user of this.users) {

            if (currentUser.userId == user.userId) {
                continue;
            }

            if (currentUser.preferredGender !== user.gender
                && currentUser.gender !== user.preferredGender ) {
                continue;
            }

            if (!(currentUser.age >= user.minPreferredAge && currentUser.age <= user.maxPreferredAge)) {
                continue;
            }

            if (!(user.age >= currentUser.minPreferredAge && user.age <= currentUser.maxPreferredAge)) {
                continue;
            }

            let interests = user.interests.filter(x => currentUser.interests.includes(x));
            if (interests) {
                matches.push({userId: user.userId, interests});
            }
        }

        matches.sort(function(a, b) {
            if (b.interests.length == a.interests.length) {
                return a.userId - b.userId;
            } else {
                return b.interests.length - a.interests.length;
            }
        });

        return matches;

    }
}

let tinder = new Tinder();

tinder.signUp(1, 1, 0, 18, 18, 25, ["Volunteering", "Volunteering", "Coding", "Skating", "Painting", "Dancing", "Reading"]);
tinder.signUp(11, 0, 1, 18, 18, 25, ["Volunteering", "Coding", "Skating", "Painting", "Dancing", "Reading"]);
tinder.signUp(2, 1, 0, 18, 22, 26, ["Painting", "Basketball", "Skating", "Dancing", "Volunteering", "Coding"]);
tinder.signUp(3, 0, 1, 23, 18, 35, ["Coding", "Skating", "Painting", "Reading"]);
tinder.signUp(7, 0, 1, 18, 18, 30, ["Writing", "Volleyball", "Painting", "Reading"]);
tinder.signUp(5, 0, 1, 24, 22, 24, ["Coding", "Basketball", "Dancing", "Singing"]);
tinder.signUp(6, 0, 1, 28, 27, 28, ["Writing", "Volunteering", "Basketball", "Dancing"]);
tinder.signUp(4, 0, 1, 19, 18, 24, ["Singing", "Volunteering", "Writing", "Skating"]);
tinder.signUp(8, 1, 0, 20, 20, 24,["Volunteering", "Singing", "Painting", "Writing", "Skating"]);
tinder.signUp(9, 1, 0, 23, 20, 30,["Volunteering", "Singing", "Basketball", "Dancing"]);
tinder.signUp(10, 1, 0, 30, 20, 40,["Skating", "Reading", "Basketball", "Singing"]);

let matchesList = tinder.getMatches(1);
console.log(matchesList);
