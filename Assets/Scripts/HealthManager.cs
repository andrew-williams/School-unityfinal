using UnityEngine;
using System.Collections;

public class HealthManager : MonoBehaviour {
	public int health = 100;
	public GUIText healthTxt;
	public GameObject guy;
	public Transform splosionPF;
	
	private MainGUI _gui;

	// Use this for initialization
	void Start () {
		_gui = GameObject.Find("Main Camera").GetComponent<MainGUI>();
	}
	
	// Update is called once per frame
	void Update () {
		healthTxt.text = health.ToString();
		if ( health == 0 ) {
			guy.SetActive(false);
			Instantiate( splosionPF, guy.transform.position, Quaternion.identity );
		}
	}
}
