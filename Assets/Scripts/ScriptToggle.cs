using UnityEngine;
using System.Collections;

public class ScriptToggle : MonoBehaviour {
	GameObject lCube;
	GameObject wCube;
	CubeScriptC lCubeC;
	CubeScriptC wCubeC;
	CubeScriptJS lCubeJS;
	CubeScriptJS wCubeJS;	

	void Start () {
		lCube = GameObject.Find("LocalCube");
		wCube = GameObject.Find("WorldCube");
		lCubeC = lCube.GetComponent<CubeScriptC>();
		lCubeJS = lCube.GetComponent<CubeScriptJS>();
		wCubeC = wCube.GetComponent<CubeScriptC>();
		wCubeJS = wCube.GetComponent<CubeScriptJS>();
	}
	
	void Update () {
		if ( Input.GetKeyDown("space") ) {
			lCubeC.enabled = !lCubeC.enabled;
			lCubeJS.enabled = !lCubeJS.enabled;
			wCubeC.enabled = !wCubeC.enabled;
			wCubeJS.enabled = !wCubeJS.enabled;
		}
	}
}
