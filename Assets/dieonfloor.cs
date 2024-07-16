using UnityEngine;
using System.Collections;

public class dieonfloor : MonoBehaviour {
	
	private Vector3 pos;
	public int ttl;
	private const int FPS = 60;
	// Use this for initialization
	void Start () {
		ttl = 1 * FPS;
	}
	
	// Update is called once per frame
	void Update () {
		pos = transform.position;
		pos.y = 251;
    	//Debug.Log (pos);
    	transform.position = pos;//transform.GetChild(0).position = pos;
		
		if (gameObject.name != "tempbullet"){
			if (ttl <= 0){
			attemptKill	();
			}
			else{
				ttl = ttl - 1;		
			}
		}
		
	}
	void OnCollisionEnter ( )
    {
		if (gameObject.name != "tempbullet"){
			attemptKill();
		}
    }
	
	void attemptKill(){
		GameObject.Destroy ( gameObject ) ;	
	}
}
