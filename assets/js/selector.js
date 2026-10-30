// Solution Selector widget: area -> need -> recommended product. Static data from the Oct 2026 deck.
(function () {
  var host = document.getElementById("widget");
  if (!host) return;
  var D = [
    { k: "A", t: "Third-party vendors", page: "securityscorecard-101.html", needs: [
      ["I need visibility into vendors and third or fourth parties", "SecurityScorecard TITAN Watch", "Continuous A-F ratings and detection of unregistered vendors."],
      ["Questionnaire and evidence work is too heavy", "SecurityScorecard TITAN Assess", "AI questionnaire automation and auto-fill from vendor documents."],
      ["I must respond right away to exploited vulnerabilities", "SecurityScorecard TITAN Secure", "Threat-based prioritization, Remediate Agent, breach triage."],
      ["I lack staff and want the whole process automated", "SecurityScorecard TITAN Secure (Workflow + Agents)", "Intake-to-remediation in a single flow with a reporting agent."],
      ["I want to outsource operations", "SecurityScorecard TITAN MAX", "A certified partner runs assessment, monitoring and remediation."]] },
    { k: "B", t: "Own external exposure", page: "securityscorecard-101.html", needs: [
      ["I don't know which assets and ports are exposed", "TITAN Watch Self-Monitoring", "Own scorecard and Attack Surface Intelligence."],
      ["Does a new CVE or KEV entry affect my assets?", "STRIKE + TITAN Secure", "Threat alerts, exploit-based findings, real-time feed."],
      ["I need evidence for executives, auditors, insurers or regulators", "Compliance mapping (+ CRQ, optional)", "Framework mapping, reports and risk quantification."],
      ["I need the owner identified and a config or patch fix", "Mondoo", "Joins external findings with exposure-management assets to support the fix."],
      ["I must prove the exposed app can be attacked", "Alt Security", "Autonomous AI pen tester proves the attack path."]] },
    { k: "C", t: "Infrastructure and apps", page: "mondoo-101.html", needs: [
      ["Cloud misconfiguration and IaC are my main worry", "Mondoo CSPM + IaC Security", "Closed loop from detection to deployed fix."],
      ["I have a large server and endpoint vulnerability backlog", "Mondoo Agentic Vulnerability Management", "Five-factor ranking, tickets and pull requests."],
      ["I need to control AI agents and MCP on employee PCs", "Mondoo Shadow AI / AI Security", "AI inventory, allow policies and enforcement."],
      ["I want to stop CI/CD and supply-chain issues at code stage", "Mondoo Software Supply Chain", "GitHub Actions and Jenkins integration."],
      ["I need continuous PCI DSS, NIST or ISO checks", "Mondoo Policy-as-Code Compliance", "Continuous framework checks and evidence."],
      ["I want experts to shrink the backlog", "Mondoo Managed Vulnerability Service", "AI agents and an expert team operate it."]] },
    { k: "D", t: "Exploitability validation", page: "alt-security-101.html", needs: [
      ["I must check a core web-app release for business-logic flaws", "Alt Continuous Testing", "Learns the app from outside; finds logic flaws and attack chains."],
      ["Are critical SSC or Mondoo findings really exploitable?", "Alt Exploit Proof", "Proof results feed Mondoo fix tickets."],
      ["I want to verify after a Mondoo fix", "Alt Retest", "Before-and-after comparison as MTTN evidence."],
      ["I need a human pen-test report, or infrastructure and AI in scope", "Confirm scope, then run in parallel", "Check Alt's supported scope and report format first."]] }
  ];
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }
  var box = el("div", "sel"); host.appendChild(box);
  box.appendChild(el("h3", "", "Find the right solution"));
  box.appendChild(el("p", "meta", "1. Where is the exposure?"));
  var areas = el("div", "opts"), needsH = el("p", "meta", ""), needs = el("div", "opts"), res = el("div", "");
  box.appendChild(areas); box.appendChild(needsH); box.appendChild(needs); box.appendChild(res);
  function pick(c, btn, group) { Array.prototype.forEach.call(group.children, function (b) { b.classList.remove("on"); }); btn.classList.add("on"); }
  D.forEach(function (a) {
    var b = el("button", "", a.k + ". " + a.t);
    b.type = "button";
    b.onclick = function () {
      pick(a, b, areas); needs.textContent = ""; res.textContent = ""; needsH.textContent = "2. What does the customer need?";
      a.needs.forEach(function (n) {
        var nb = el("button", "", n[0]); nb.type = "button";
        nb.onclick = function () {
          pick(n, nb, needs); res.textContent = "";
          var r = el("div", "res"); r.appendChild(el("b", "", "Recommended: " + n[1])); r.appendChild(el("p", "", n[2]));
          var l = el("a", "", "Open the 101 for this solution"); l.href = a.page; r.appendChild(l);
          res.appendChild(r);
        };
        needs.appendChild(nb);
      });
    };
    areas.appendChild(b);
  });
})();
