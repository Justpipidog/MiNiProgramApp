<?php
 include "\x57\145\151\x78\151\156\120\141\171\x2e\x70\150\160"; class WeixinRefund extends WeixinPay { protected $sslcert_path; protected $sslkey_path; protected $appid; protected $mch_id; protected $out_trade_no; protected $out_refund_no; protected $total_fee; protected $refund_fee; protected $key; protected $uniacid; protected $types; protected $formid; function __construct($appid, $key, $mch_id, $out_trade_no, $out_refund_no, $total_fee, $refund_fee, $path, $types, $formid = '') { goto f6PKW; SdlQd: if (!$path) { goto D1poE; } goto cUbdI; CKDRC: $this->out_refund_no = $out_refund_no; goto q6mXr; yPILb: $this->formid = $formid; goto SdlQd; cUbdI: $this->sslcert_path = __DIR__ . "\57\103\x65\162\164\x2f" . $path . "\57\x61\x70\151\143\154\151\145\156\164\x5f\143\145\x72\x74\56\160\x65\155"; goto ybrdn; q6mXr: $this->total_fee = $total_fee; goto pF9Nn; h7DCL: $this->out_trade_no = $out_trade_no; goto CKDRC; ybrdn: $this->sslkey_path = __DIR__ . "\x2f\x43\145\162\164\57" . $path . "\57\x61\160\x69\143\154\x69\x65\x6e\164\x5f\x6b\x65\x79\x2e\x70\x65\155"; goto N18Wx; f6PKW: $this->appid = $appid; goto lm763; McCAZ: $this->key = $key; goto Ziyra; RCYmV: $this->types = $types; goto yPILb; N18Wx: D1poE: goto RwTWh; pF9Nn: $this->refund_fee = $refund_fee; goto McCAZ; lm763: $this->mch_id = $mch_id; goto h7DCL; Ziyra: $this->uniacid = $path; goto RCYmV; RwTWh: } public function refund() { $result = $this->wxrefundapi(); return $result; } private function wxrefundapi() { goto rdIzS; sYLHy: file_get_contents($url); goto ZFA2Z; Q_nPQ: $xmldata = $this->arrayToXml($parameters); goto Ub0s2; Ub0s2: $xmlresult = $this->postXmlSSLCurl($xmldata, $url, 60); goto eVr1z; n1axG: feu0V: goto Qu3q9; ZFA2Z: U2_mb: goto ur9pG; Qu3q9: if (!($this->types == "\x79\x75\x79\x75\x65" || $this->types == "\171\x75\171\x75\x65\161\170")) { goto U2_mb; } goto cDn3T; eVr1z: $result = $this->xmlToArray($xmlresult); goto nNQxY; nNQxY: if (!($result["\162\145\164\165\x72\156\137\143\157\144\145"] == "\x53\x55\103\103\x45\x53\123" && $result["\162\145\163\x75\154\164\137\143\157\144\145"] == "\x53\x55\x43\x43\x45\x53\123")) { goto KAEp6; } goto uUO0A; rdIzS: $url = "\x68\x74\x74\x70\163\72\x2f\x2f\x61\160\x69\56\x6d\143\x68\x2e\x77\x65\x69\170\151\156\56\161\x71\x2e\143\157\x6d\57\163\x65\x63\x61\x70\x69\x2f\x70\x61\171\x2f\162\x65\x66\x75\156\x64"; goto X2T17; uUO0A: if (!($this->types == "\x64\165\157" || $this->types == "\144\x75\157\x71\170" || $this->types == "\x64\x75\157\x74\x6b" || $this->types == "\144\x61\156" || $this->types == "\144\141\156\x71\170" || $this->types == "\x64\141\156\164\x6b")) { goto feu0V; } goto yUYUC; wAHqh: return $result; goto PqPRf; RcObd: $parameters["\x73\x69\x67\x6e"] = $this->getSign($parameters); goto Q_nPQ; ur9pG: KAEp6: goto wAHqh; YEjAE: file_get_contents($url); goto n1axG; cDn3T: $url = $this->getNotifyUrl("\57\x61\160\160\x2f\151\x6e\144\145\x78\x2e\160\150\160\x3f\x69\x3d" . $this->uniacid . "\x26\x66\x72\157\x6d\75\x77\170\141\160\x70\46\143\75\x65\156\164\x72\x79\46\141\x3d\167\x78\x61\x70\x70\46\x64\157\x3d\162\145\x66\x75\x6e\144\x6e\157\164\x69\146\x79\x26\155\x3d\163\x75\x64\165\70\x5f\160\x61\147\145\x26\157\165\x74\x5f\x72\x65\146\x75\x6e\144\137\156\x6f\75" . $result["\x6f\165\x74\137\162\145\x66\165\156\x64\x5f\156\157"] . "\x26\x74\171\160\145\163\x3d" . $this->types . "\x26\x66\x6f\162\155\x69\144\75" . $this->formid); goto sYLHy; yUYUC: $url = $this->getNotifyUrl("\x2f\141\x70\160\57\151\156\144\145\170\x2e\x70\x68\x70\x3f\x69\75" . $this->uniacid . "\x26\146\162\x6f\x6d\x3d\x77\x78\141\160\160\46\143\x3d\145\x6e\164\x72\171\46\141\75\167\170\x61\x70\160\x26\144\x6f\75\162\145\146\165\156\144\x6e\x6f\x74\x69\146\x79\46\155\x3d\163\165\144\165\70\x5f\x70\x61\147\145\x26\x6f\x75\164\137\162\x65\146\165\156\x64\x5f\156\x6f\x3d" . $result["\157\165\164\x5f\x72\145\x66\x75\x6e\144\137\156\x6f"] . "\46\x74\x79\x70\x65\163\75" . $this->types); goto YEjAE; X2T17: $parameters = array("\141\160\x70\151\x64" => $this->appid, "\x6d\x63\x68\137\x69\144" => $this->mch_id, "\x6e\x6f\156\x63\x65\x5f\163\x74\162" => $this->createNoncestr(), "\157\165\x74\x5f\162\145\x66\165\156\144\137\156\157" => $this->out_refund_no, "\x6f\165\164\137\164\162\x61\144\x65\137\156\157" => $this->out_trade_no, "\x72\x65\x66\165\x6e\144\x5f\x66\145\x65" => $this->refund_fee, "\164\157\x74\141\x6c\x5f\x66\145\145" => $this->total_fee); goto RcObd; PqPRf: } private function postXmlSSLCurl($xml, $url, $second = 30) { goto zy8ff; ZYVxS: return false; goto NzOp8; I5vbR: rUJzR: goto BH1X5; tyZbw: return $data; goto I5vbR; wxBnR: curl_setopt($ch, CURLOPT_POSTFIELDS, $xml); goto ODfxz; KbLpy: curl_setopt($ch, CURLOPT_TIMEOUT, $second); goto K_sXQ; vKS1O: U_1ux: goto RN9LD; DniYe: if ($data) { goto U_1ux; } goto qbvbP; RXVc3: curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); goto o3FGX; o3FGX: curl_setopt($ch, CURLOPT_HEADER, FALSE); goto VQ9IA; Kc4BF: curl_setopt($ch, CURLOPT_SSLKEYTYPE, "\x50\105\x4d"); goto ankya; zy8ff: $ch = curl_init(); goto KbLpy; ankya: curl_setopt($ch, CURLOPT_SSLKEY, $this->sslkey_path); goto qRYyG; WPmMV: curl_setopt($ch, CURLOPT_SSLCERTTYPE, "\x50\105\115"); goto eymZI; RN9LD: curl_close($ch); goto tyZbw; NzOp8: goto rUJzR; goto vKS1O; qRYyG: curl_setopt($ch, CURLOPT_POST, true); goto wxBnR; bDrwT: curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); goto RXVc3; eymZI: curl_setopt($ch, CURLOPT_SSLCERT, $this->sslcert_path); goto Kc4BF; bPMzW: curl_close($ch); goto ZYVxS; qbvbP: $error = curl_errno($ch); goto bPMzW; K_sXQ: curl_setopt($ch, CURLOPT_URL, $url); goto bDrwT; VQ9IA: curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); goto WPmMV; ODfxz: $data = curl_exec($ch); goto DniYe; BH1X5: } }