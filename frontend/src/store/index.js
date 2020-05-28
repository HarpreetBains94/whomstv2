import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sample: {
      song: {},
      artists: [],
      featArtists: [],
      producers: []
    },
    pairs: [],
    correctAnswer: null,
    shouldShowAnswer: false,
    randomSampleId: null,
    loading: false,
    questionPair: {},
    previousIds: [],
    nextIds: []
  },
  mutations: {
    setSample(state, sample) {
      state.sample = sample;
    },
    setPairs(state, pairs) {
      state.pairs = pairs;
    },
    setCorrectAnswer(state, correctAnswerIndex) {
      state.correctAnswer = state.pairs[correctAnswerIndex];
    },
    setShouldShowAnswer(state, shouldShowAnswer) {
      state.shouldShowAnswer = shouldShowAnswer;
    },
    setRandomSampleId(state, randomSampleId) {
      state.randomSampleId = randomSampleId;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setQuestionPair(state, pair) {
      state.questionPair = pair;
    },
    doPreviousClickStuff(state) {
      state.nextIds.unshift(state.previousIds.shift());
    },
    doNextClickStuff(state) {
      if (state.nextIds.length !== 0) {
        state.previousIds.unshift(state.nextIds.shift());
        return;
      }
      state.previousIds.unshift(state.sample.song.id);
    }
  },
  actions: {
    newSampleFetched(context, data) {
      context.commit("setSample", data.sample);
      context.commit("setPairs", data.pairs);
      context.commit("setRandomSampleId", data.randomSampleId);
      context.commit(
        "setQuestionPair",
        data.pairs[Math.floor(Math.random() * Math.floor(data.pairs.length))]
      );
      context.commit("setShouldShowAnswer", false);
    },
    answerChosen(context, correctAnswerIndex) {
      context.commit("setCorrectAnswer", correctAnswerIndex);
      context.commit("setShouldShowAnswer", true);
    },
    startLoading(context) {
      context.commit("setLoading", true);
    },
    stopLoading(context) {
      context.commit("setLoading", false);
    },
    doPreviousClickStuff(context) {
      context.commit("doPreviousClickStuff");
    },
    doNextClickStuff(context) {
      context.commit("doNextClickStuff");
    },
    onSkipClicked(context) {
      context.commit("setCorrectAnswer", 0);
      context.commit("setShouldShowAnswer", true);
    }
  },
  getters: {
    sample: state => {
      return state.sample;
    },
    pairs: state => {
      return state.pairs;
    },
    correctAnswer: state => {
      return state.correctAnswer;
    },
    shouldShowAnswer: state => {
      return state.shouldShowAnswer;
    },
    randomSampleId: state => {
      return state.randomSampleId;
    },
    loading: state => {
      return state.loading;
    },
    questionPair: state => {
      return state.questionPair;
    },
    hasNoPreviousId: state => {
      return state.previousIds.length === 0;
    },
    previousId: state => {
      return state.previousIds[0];
    },
    nextId: state => {
      return state.nextIds[0] || state.randomSampleId;
    }
  },
  modules: {}
});
