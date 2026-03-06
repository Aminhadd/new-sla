const MINUTE_MS = 60_000;

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * MINUTE_MS);
}

function computeSlaDeadlines(createdAt, policy) {
  return {
    responseBy: addMinutes(createdAt, policy.response_minutes),
    resolveBy: addMinutes(createdAt, policy.resolve_minutes),
    escalateAt: addMinutes(createdAt, Math.max(policy.response_minutes - policy.escalation_minutes, 1))
  };
}

function computeBreachState(args) {
  const completed = args.status === 'Completed' || args.status === 'Closed';
  return {
    responseBreached: !completed && args.now.getTime() > args.responseBy.getTime(),
    resolutionBreached: !completed && args.now.getTime() > args.resolveBy.getTime(),
    approachingResponseBreach: !completed && args.now.getTime() > addMinutes(args.responseBy, -15).getTime()
  };
}

module.exports = { computeSlaDeadlines, computeBreachState };
